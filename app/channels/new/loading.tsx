import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 md:px-6">
            <div className="flex items-center gap-2 font-semibold">
              <Link href="/">MediaPlan Pro</Link>
            </div>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
                Dashboard
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/campaigns">
                Campaigns
              </Link>
              <Link className="text-sm font-medium underline underline-offset-4" href="/channels">
                Channels
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/reports">
                Reports
              </Link>
            </nav>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-6 flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link href="/channels">
                <ChevronLeft className="mr-1 h-4 w-4" /> Back to Channels
              </Link>
            </Button>
            <Skeleton className="h-9 w-48" />
          </div>
          <Skeleton className="h-[600px]" />
        </div>
      </div>
    </div>
  )
}
