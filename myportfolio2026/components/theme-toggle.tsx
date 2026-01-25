"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = mounted ? (resolvedTheme || theme || "dark") : "dark"
  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  // Always render same structure (both icons) to avoid hydration mismatch
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={mounted ? toggleTheme : undefined}
      disabled={!mounted}
      className="rounded-lg w-8 h-8 hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95 border border-transparent hover:border-black/5 dark:hover:border-white/10 relative"
      aria-label={mounted ? "Toggle theme" : "Theme"}
      suppressHydrationWarning
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}


