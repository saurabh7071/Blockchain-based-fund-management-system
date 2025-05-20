import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-[300px] mx-auto mb-4" />
        <Skeleton className="h-5 w-[500px] mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-6">
            <Skeleton className="h-6 w-[120px] mb-2" />
            <Skeleton className="h-4 w-[180px] mb-4" />
            <Skeleton className="h-5 w-[150px] mb-1" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <Skeleton className="h-8 w-[200px] mb-6" />
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </div>

        <div>
          <Skeleton className="h-8 w-[250px] mb-6" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <Skeleton className="h-6 w-[200px] mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%] mt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl p-8">
        <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
        <Skeleton className="h-8 w-[250px] mx-auto mb-4" />
        <Skeleton className="h-4 w-[400px] mx-auto mb-6" />
        <Skeleton className="h-10 w-[150px] mx-auto" />
      </div>
    </div>
  )
}
