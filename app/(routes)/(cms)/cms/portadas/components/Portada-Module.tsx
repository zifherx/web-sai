"use client"

import { PortadaCards } from "@/components/modules/(portada-dashboard)/Portada-Cards"
import { PortadaDeleteDialog } from "@/components/modules/(portada-dashboard)/Portada-Delete-Dialog"
import { PortadaEmptyState } from "@/components/modules/(portada-dashboard)/Portada-Empty-State"
import { PortadaFilters } from "@/components/modules/(portada-dashboard)/Portada-Filters"
import { PortadaFormDialog } from "@/components/modules/(portada-dashboard)/Portada-Form-Dialog"
import { PortadaHeader } from "@/components/modules/(portada-dashboard)/Portada-Header"
import { PortadaSkeleton } from "@/components/modules/(portada-dashboard)/Portada-Skeleton"
import { PortadaTable } from "@/components/modules/(portada-dashboard)/Portada-Table"
import { usePortadas, useToggleActivePortada } from "@/hooks"
import { PortadaStatusFilter, PortadaType, PortadaViewMode } from "@/types"
import { useMemo, useState } from "react"

export function PortadaModule() {
  const { data: portadas, isLoading, isError } = usePortadas()
  const toggleActive = useToggleActivePortada()

  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<PortadaStatusFilter>("all")
  const [view, setView] = useState<PortadaViewMode>("table")

  const [formOpen, setFormOpen] = useState(false)
  const [editingPortada, setEditingPortada] = useState<PortadaType | null>(null)
  const [deletingPortada, setDeletingPortada] = useState<PortadaType | null>(
    null
  )

  const filtered = useMemo(() => {
    if (!portadas) return []
    return portadas.filter((portada) => {
      const matchesSearch = portada.name
        .toLowerCase()
        .includes(search.trim().toLowerCase())
      const matchesStatus =
        status === "all"
          ? true
          : status === "active"
            ? portada.isActive
            : !portada.isActive
      return matchesSearch && matchesStatus
    })
  }, [portadas, search, status])

  const hasFilters = search.trim().length > 0 || status !== "all"

  const openCreateDialog = () => {
    setEditingPortada(null)
    setFormOpen(true)
  }

  const openEditDialog = (portada: PortadaType) => {
    setEditingPortada(portada)
    setFormOpen(true)
  }

  const handleToggleActive = (portada: PortadaType) => {
    toggleActive.mutate({ id: portada.id, isActive: !portada.isActive })
  }

  const clearFilters = () => {
    setSearch("")
    setStatus("all")
  }

  return (
    <div className="flex flex-col gap-6">
      <PortadaHeader />

      <PortadaFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        view={view}
        onViewChange={setView}
        onCreate={openCreateDialog}
        total={portadas?.length ?? 0}
      />

      {isLoading ? (
        <PortadaSkeleton view={view} />
      ) : isError ? (
        <div className="rounded-lg border border-dashed py-16 text-center text-destructive">
          Ocurrió un error al cargar las portadas.
        </div>
      ) : filtered.length === 0 ? (
        <PortadaEmptyState
          hasFilters={hasFilters}
          onCreate={openCreateDialog}
          onClearFilters={clearFilters}
        />
      ) : view === "table" ? (
        <PortadaTable
          portadas={filtered}
          onEdit={openEditDialog}
          onToggleActive={handleToggleActive}
          onDelete={setDeletingPortada}
        />
      ) : (
        <PortadaCards
          portadas={filtered}
          onEdit={openEditDialog}
          onToggleActive={handleToggleActive}
          onDelete={setDeletingPortada}
        />
      )}

      <PortadaFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        portada={editingPortada}
      />

      <PortadaDeleteDialog
        open={Boolean(deletingPortada)}
        onOpenChange={(open) => !open && setDeletingPortada(null)}
        portada={deletingPortada}
      />
    </div>
  )
}
