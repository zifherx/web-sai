"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

// ─── Configuración (coordenadas lógicas del lienzo) ─────────────────
const W = 800
const H = 220
const GROUND_Y = 186
const GRAVITY = 2600 // px/s²
const JUMP_VELOCITY = -780 // px/s
const SPEED_START = 380 // px/s
const SPEED_MAX = 950
const SPEED_GAIN = 10 // px/s ganados por segundo
const MAX_DT = 1 / 30 // evita "teletransportes" al volver de otra pestaña
const HS_KEY = "sai-car-runner-hs"

const CAR = { x: 70, w: 72, h: 34, wheelR: 8 } as const

// Hex aproximados a la paleta SAI (canvas no resuelve las variables de Tailwind)
const C = {
  body: "#1f4fbf", // ≈ sky-custom-500
  dark: "#273463", // ≈ blue-custom-500
  window: "#d6e2ff",
  hub: "#e5e5e5",
  ground: "#9a9a9a",
  text: "#5f5f5f",
  cone: "#f26b1d",
  barrier: "#b3261e", // ≈ red-custom-500
  white: "#ffffff",
  light: "#ffd84d",
} as const

type Status = "idle" | "running" | "over"
type ObstacleKind = "cone" | "tires" | "barrier"

interface Obstacle {
  kind: ObstacleKind
  x: number
  w: number
  h: number
}

const OBSTACLES: Record<ObstacleKind, { w: number; h: number }> = {
  cone: { w: 22, h: 32 },
  tires: { w: 30, h: 38 },
  barrier: { w: 52, h: 26 },
}
const KINDS = Object.keys(OBSTACLES) as ObstacleKind[]

const rand = (min: number, max: number) => min + Math.random() * (max - min)
const pad5 = (n: number) => String(n).padStart(5, "0")

function readHighScore(): number {
  try {
    return Number(window.localStorage.getItem(HS_KEY)) || 0
  } catch {
    return 0
  }
}

function saveHighScore(value: number): void {
  try {
    window.localStorage.setItem(HS_KEY, String(value))
  } catch {
    /* modo privado / storage bloqueado: el récord solo vive en memoria */
  }
}

/**
 * Minijuego tipo "dino de Chrome" con un auto.
 * - 100 % canvas 2D, sin imágenes ni assets: 0 requests de red adicionales.
 * - El estado del juego vive en un objeto local del effect (no en React state):
 *   60 fps sin re-renders. React solo se entera de idle/running/over.
 * - requestAnimationFrame se pausa solo cuando la pestaña no está visible.
 */
export function CarRunnerGame({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const actionRef = useRef<() => void>(() => {})
  const [status, setStatus] = useState<Status>("idle")

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    // Nitidez en pantallas retina (tope 2x para no inflar memoria del canvas)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const g = {
      status: "idle" as Status,
      last: 0,
      carY: GROUND_Y, // base inferior del auto
      vy: 0,
      speed: SPEED_START,
      distance: 0,
      wheelAngle: 0,
      nextSpawn: 400,
      obstacles: [] as Obstacle[],
      highScore: readHighScore(),
    }
    let raf = 0

    const score = () => Math.floor(g.distance / 10)

    const reset = () => {
      g.carY = GROUND_Y
      g.vy = 0
      g.speed = SPEED_START
      g.distance = 0
      g.wheelAngle = 0
      g.nextSpawn = 400
      g.obstacles = []
    }

    // AABB con margen para que el choque se sienta "justo"
    const collides = (o: Obstacle) => {
      const pad = 6
      const cx = CAR.x + pad
      const cy = g.carY - CAR.h + pad
      const cw = CAR.w - pad * 2
      const ch = CAR.h - pad
      const oy = GROUND_Y - o.h
      return cx < o.x + o.w && cx + cw > o.x && cy < oy + o.h && cy + ch > oy
    }

    // ─── Física ───────────────────────────────────────────────
    const update = (dt: number) => {
      g.speed = Math.min(SPEED_MAX, g.speed + SPEED_GAIN * dt)

      g.vy += GRAVITY * dt
      g.carY = Math.min(GROUND_Y, g.carY + g.vy * dt)
      if (g.carY === GROUND_Y) g.vy = 0

      const dx = g.speed * dt
      g.distance += dx
      g.wheelAngle += dx / CAR.wheelR

      for (const o of g.obstacles) o.x -= dx
      g.obstacles = g.obstacles.filter((o) => o.x + o.w > -10)

      g.nextSpawn -= dx
      if (g.nextSpawn <= 0) {
        const kind = KINDS[Math.floor(Math.random() * KINDS.length)] ?? "cone"
        g.obstacles.push({ kind, x: W + 10, ...OBSTACLES[kind] })
        // El hueco escala con la velocidad: siempre hay tiempo de aterrizar y re-saltar
        g.nextSpawn = g.speed * rand(0.8, 1.6) + 140
      }

      if (g.obstacles.some(collides)) gameOver()
    }

    // ─── Dibujo ───────────────────────────────────────────────
    const drawWheel = (cx: number, cy: number) => {
      ctx.fillStyle = C.dark
      ctx.beginPath()
      ctx.arc(cx, cy, CAR.wheelR, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = C.hub
      ctx.beginPath()
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2)
      ctx.fill()
      // Rayo giratorio: da sensación de movimiento
      const r = CAR.wheelR - 1.5
      ctx.strokeStyle = C.hub
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(
        cx + Math.cos(g.wheelAngle) * r,
        cy + Math.sin(g.wheelAngle) * r
      )
      ctx.stroke()
    }

    const drawCar = () => {
      const x = CAR.x
      const top = g.carY - CAR.h

      ctx.fillStyle = C.body
      ctx.beginPath()
      ctx.roundRect(x, top + 12, CAR.w, 16, 5)
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(x + 14, top + 13)
      ctx.lineTo(x + 24, top)
      ctx.lineTo(x + 50, top)
      ctx.lineTo(x + 60, top + 13)
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = C.window
      ctx.beginPath()
      ctx.moveTo(x + 20, top + 12)
      ctx.lineTo(x + 27, top + 4)
      ctx.lineTo(x + 36, top + 4)
      ctx.lineTo(x + 36, top + 12)
      ctx.closePath()
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(x + 39, top + 12)
      ctx.lineTo(x + 39, top + 4)
      ctx.lineTo(x + 48, top + 4)
      ctx.lineTo(x + 54, top + 12)
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = C.light
      ctx.fillRect(x + CAR.w - 4, top + 15, 4, 4)

      drawWheel(x + 17, g.carY - CAR.wheelR)
      drawWheel(x + CAR.w - 17, g.carY - CAR.wheelR)
    }

    const drawObstacle = (o: Obstacle) => {
      const y = GROUND_Y - o.h
      switch (o.kind) {
        case "cone":
          ctx.fillStyle = C.cone
          ctx.beginPath()
          ctx.moveTo(o.x + o.w / 2, y)
          ctx.lineTo(o.x + o.w - 3, GROUND_Y - 4)
          ctx.lineTo(o.x + 3, GROUND_Y - 4)
          ctx.closePath()
          ctx.fill()
          ctx.fillRect(o.x, GROUND_Y - 4, o.w, 4)
          ctx.fillStyle = C.white
          ctx.fillRect(o.x + o.w / 2 - 5, y + o.h * 0.45, 10, 4)
          break
        case "tires":
          ctx.fillStyle = C.dark
          for (let i = 0; i < 3; i++) {
            ctx.beginPath()
            ctx.roundRect(o.x, y + i * (o.h / 3), o.w, o.h / 3 - 1, 5)
            ctx.fill()
          }
          break
        case "barrier":
          ctx.fillStyle = C.white
          ctx.fillRect(o.x, y, o.w, 14)
          ctx.fillStyle = C.barrier
          for (let sx = 0; sx < o.w - 4; sx += 13)
            ctx.fillRect(o.x + sx, y, 7, 14)
          ctx.strokeStyle = C.barrier
          ctx.lineWidth = 1
          ctx.strokeRect(o.x + 0.5, y + 0.5, o.w - 1, 13)
          ctx.fillStyle = C.dark
          ctx.fillRect(o.x + 4, y + 14, 4, o.h - 14)
          ctx.fillRect(o.x + o.w - 8, y + 14, 4, o.h - 14)
          break
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Pista + líneas que se desplazan
      ctx.fillStyle = C.ground
      ctx.fillRect(0, GROUND_Y, W, 2)
      const off = g.distance % 40
      for (let x = -off; x < W; x += 40) ctx.fillRect(x, GROUND_Y + 12, 18, 2)

      for (const o of g.obstacles) drawObstacle(o)
      drawCar()

      ctx.fillStyle = C.text
      ctx.font = "bold 14px ui-monospace, SFMono-Regular, Menlo, monospace"
      ctx.textAlign = "right"
      ctx.fillText(`HI ${pad5(g.highScore)}   ${pad5(score())}`, W - 16, 28)

      if (g.status !== "running") {
        ctx.textAlign = "center"
        ctx.fillStyle = C.dark
        ctx.font = "bold 20px system-ui, sans-serif"
        ctx.fillText(
          g.status === "over" ? "¡Choque! Otra vuelta" : "Listo para arrancar",
          W / 2,
          84
        )
        ctx.fillStyle = C.text
        ctx.font = "14px system-ui, sans-serif"
        ctx.fillText("Pulsa ESPACIO / ↑ o toca la pista", W / 2, 110)
      }
    }

    // ─── Ciclo de vida ────────────────────────────────────────
    const loop = (t: number) => {
      const dt = Math.max(0, Math.min((t - g.last) / 1000, MAX_DT))
      g.last = t
      update(dt)
      draw()
      if (g.status === "running") raf = requestAnimationFrame(loop)
    }

    const start = () => {
      reset()
      g.status = "running"
      setStatus("running")
      g.last = performance.now()
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(loop)
    }

    function gameOver() {
      g.status = "over"
      const s = score()
      if (s > g.highScore) {
        g.highScore = s
        saveHighScore(s)
      }
      setStatus("over")
    }

    actionRef.current = () => {
      if (g.status !== "running") return start()
      if (g.carY >= GROUND_Y) g.vy = JUMP_VELOCITY
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" && e.code !== "ArrowUp") return
      if (e.repeat) return
      // No secuestrar el espacio si el foco está en un botón/enlace/campo
      if (
        e.target instanceof HTMLElement &&
        e.target.closest("button, a, input, textarea, select")
      ) {
        return
      }
      e.preventDefault() // evita que la página haga scroll
      actionRef.current()
    }

    window.addEventListener("keydown", onKey)
    draw() // primer cuadro estático (pantalla de "listo")

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("keydown", onKey)
      actionRef.current = () => {}
    }
  }, [])

  return (
    <div className={cn("w-full", className)}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          e.preventDefault()
          actionRef.current()
        }}
        className="aspect-800/220 w-full cursor-pointer touch-none rounded-2xl border border-gray-custom-300 bg-white select-none"
        role="img"
        aria-label="Minijuego: un auto que salta obstáculos. Usa espacio, flecha arriba o toca para saltar."
      />
      <p className="sr-only" aria-live="polite">
        {status === "over"
          ? "Fin del juego"
          : status === "running"
            ? "Jugando"
            : ""}
      </p>
    </div>
  )
}
