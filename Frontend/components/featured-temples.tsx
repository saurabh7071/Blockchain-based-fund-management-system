import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TempleImage } from "@/components/temple-images";

export function FeaturedTemples() {
  const temples = [
    {
      id: 1,
      name: "ISKCON Temple",
      location: "Delhi",
      totalDonations: "₹45,00,000",
      lastMonthExpense: "₹12,50,000",
      isVerified: true,
    },
    {
      id: 2,
      name: "Shri Siddhivinayak Temple",
      location: "Mumbai",
      totalDonations: "₹1,20,00,000",
      lastMonthExpense: "₹35,00,000",
      isVerified: true,
    },
    {
      id: 3,
      name: "Meenakshi Amman Temple",
      location: "Madurai",
      totalDonations: "₹75,00,000",
      lastMonthExpense: "₹18,00,000",
      isVerified: true,
    },
    {
      id: 4,
      name: "Kashi Vishwanath Temple",
      location: "Varanasi",
      totalDonations: "₹95,00,000",
      lastMonthExpense: "₹22,00,000",
      isVerified: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {temples.map((temple) => (
        <Card
          key={temple.id}
          className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative">
            <TempleImage
              id={temple.id}
              className="w-full h-48 object-cover"
            />
            {temple.isVerified && (
              <Badge className="absolute top-3 right-3 bg-green-600 hover:bg-green-700">
                Verified
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{temple.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {temple.location}
                </p>
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Total Donations</span>
                  <span className="font-medium">
                    {temple.totalDonations}
                  </span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Last Month Expense</span>
                  <span className="font-medium">
                    {temple.lastMonthExpense}
                  </span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
