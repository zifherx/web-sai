import type { JSX, SVGProps } from "react"

type IconRegistry = Record<
  string,
  (props: SVGProps<SVGSVGElement>) => JSX.Element
>

const icons: IconRegistry = {
  facebook: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"
        fill="#223060"
      />
    </svg>
  ),
}

export type IconName = keyof typeof icons

export type SVGIconsProps = {
  name: IconName
  size?: number
  className?: string
  ariaLabel?: string
} & Omit<SVGProps<SVGSVGElement>, "name">

export function SVGIcon({
  name,
  size = 24,
  className = "",
  ariaLabel,
  ...rest
}: SVGIconsProps) {
  const IconComponent = icons[name]

  if (!IconComponent) {
    return null
  }

  return (
    <IconComponent
      width={size}
      height={size}
      className={className}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
      {...rest}
    />
  )
}
