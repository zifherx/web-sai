"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib"
import { NavMenuItem } from "@/types"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavMenu({ menu }: { menu: NavMenuItem[] }) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {menu.map(({ icon: Icon, slug, label }) => {
            const href = `/cms/${slug}`
            const isActive = pathname === href

            return (
              <SidebarMenuItem key={slug}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={label}>
                  <Link href={href}>
                    <Icon />
                    <span
                      className={cn(
                        "font-medium",
                        isActive && "text-foreground"
                      )}
                    >
                      {label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
