"use client"

type ToastProps = {
  title: string
  description?: string
  variant?: "default" | "destructive"
}

export function toast({ title, description, variant }: ToastProps) {
  // Simple alert-based toast for now
  if (variant === "destructive") {
    console.error(`${title}${description ? ": " + description : ""}`)
    alert(`Error: ${title}${description ? "\n" + description : ""}`)
  } else {
    console.log(`${title}${description ? ": " + description : ""}`)
    alert(`${title}${description ? "\n" + description : ""}`)
  }
}
