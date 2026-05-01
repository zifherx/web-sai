import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import { cn } from "../../lib/utils"
import { NavigationMenuLink } from "../ui/navigation-menu"

export const ListItem = forwardRef<
  ElementRef<"a">,
  ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
            className
          )}
          {...props}
        >
          <span className="text-sm leading-none font-semibold">{title}</span>
          <p className="line-clamp-2 text-sm leading-snug text-muted">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = "ListItem"
