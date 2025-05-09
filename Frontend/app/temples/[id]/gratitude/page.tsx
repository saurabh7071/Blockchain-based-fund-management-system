import { WallOfGratitude } from "@/components/wall-of-gratitude"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GratitudePage({ params }) {
  const templeId = params.id

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Wall of Gratitude</h1>
          <p className="text-muted-foreground">
            Celebrating the generosity of our devotees and their contributions to the temple
          </p>
        </div>
        <Button asChild className="bg-orange-600 hover:bg-orange-700">
          <Link href={`/temples/${templeId}/donate`}>Make a Donation</Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full mb-8">
        <TabsList>
          <TabsTrigger value="all">All Donations</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="highest">Highest</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <WallOfGratitude templeId={templeId} />
        </TabsContent>
        <TabsContent value="recent">
          <WallOfGratitude templeId={templeId} defaultSort="recent" />
        </TabsContent>
        <TabsContent value="highest">
          <WallOfGratitude templeId={templeId} defaultSort="highest" />
        </TabsContent>
        <TabsContent value="featured">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Top Donor of the Month</CardTitle>
                <CardDescription>October 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl font-bold">
                    AP
                  </div>
                  <div>
                    <p className="font-semibold">Amit Patel</p>
                    <p className="text-muted-foreground">Total: ₹21,001</p>
                    <p className="text-sm mt-1">For temple hall construction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Most Regular Donor</CardTitle>
                <CardDescription>12 consecutive months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl font-bold">
                    SV
                  </div>
                  <div>
                    <p className="font-semibold">Sunita Verma</p>
                    <p className="text-muted-foreground">Total: ₹78,000</p>
                    <p className="text-sm mt-1">Monthly donor since 2022</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Special Recognition</CardTitle>
                <CardDescription>For community service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl font-bold">
                    KI
                  </div>
                  <div>
                    <p className="font-semibold">Karthik Iyer</p>
                    <p className="text-muted-foreground">Total: ₹55,555</p>
                    <p className="text-sm mt-1">Education program sponsor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-orange-50 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">About the Wall of Gratitude</h2>
        <p className="mb-4">
          The Wall of Gratitude is our way of acknowledging and celebrating the generosity of our devotees. Every
          donation, regardless of its size, contributes to the growth and maintenance of our temple and its various
          initiatives.
        </p>
        <p>
          Donors can choose to remain anonymous or display their names on this wall. They can also add personal messages
          to share their devotion, prayers, or the purpose behind their contribution.
        </p>
      </div>
    </div>
  )
}
