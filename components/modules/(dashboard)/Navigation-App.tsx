"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { buildPath, formatSegment } from "@/lib"
import { Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavigationApp() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  const isRootPath = pathname === "/dashboard"

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4">
      <div className="flex w-full items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-5 h-4" />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 hover:text-foreground"
                >
                  <Home className="h-4 w-4" />
                  {isRootPath && <span className="font-medium">Dashboard</span>}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {!isRootPath &&
              segments.slice(1).map((segment, index) => {
                const isLast = index === segments.length - 2
                const path = buildPath(segments, index + 1)
                const label = formatSegment(segment)

                return (
                  <div
                    key={segment + index}
                    className="flex items-center gap-2"
                  >
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="text-base font-medium">
                          {label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link
                            href={path}
                            className="text-base font-medium hover:text-foreground"
                          >
                            {label}
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                )
              })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
