import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-lg p-6 backdrop-blur-md",
        "border border-white/20 dark:border-white/10",
        "bg-white/10 dark:bg-black/20",
        "shadow-lg",
        className
      )}
    >
      {children}
    </div>
  )
}

