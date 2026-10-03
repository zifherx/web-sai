"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getVisibleSettingsTabs } from "@/lib/global.functions"
import { SETTINGS_DIALOG_PROPS } from "@/types/site-settings.types"

export function SettingsDialog({
  onOpenChange,
  open,
  rol,
}: SETTINGS_DIALOG_PROPS) {
  const tabs = getVisibleSettingsTabs(rol)
  const first = tabs[0]
  if (!first) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="border-b px-6 py-4 text-left">
          <DialogTitle className="font-headOffice-bold text-lg">
            Configuración
          </DialogTitle>
          <DialogDescription>
            Ajustes globales del sitio y del panel administrativo
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue={first.value}
          orientation="vertical"
          className="flex min-h-105 flex-col sm:flex-row"
        >
          <TabsList className="h-auto shrink-0 justify-start gap-1 rounded-none border-b bg-transparent p-2 sm:w-52 sm:flex-col sm:items-stretch sm:border-r sm:border-b-0">
            {tabs.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="justify-start gap-2 rounded-md px-3 py-2 data-[state=active]:bg-sky-custom-50 data-[state=active]:text-sky-custom-500 data-[state=active]:shadow-none"
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="mt-0 flex-1 overflow-y-auto p-6"
            >
              <header className="mb-5">
                <h3 className="font-headOffice-bold text-base text-gray-custom-900">
                  {tab.label}
                </h3>
                <p className="font-textOffice-regular text-sm text-gray-custom-700">
                  {tab.description}
                </p>
              </header>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
