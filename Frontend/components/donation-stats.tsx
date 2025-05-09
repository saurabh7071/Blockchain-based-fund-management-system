"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Chart } from "@/components/ui/chart"
import { BarChart, LineChart, PieChart } from "lucide-react"

export function DonationStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Statistics</CardTitle>
        <CardDescription>Transparent view of all donations and fund utilization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Funds Received</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹45,00,000</div>
              <p className="text-xs text-muted-foreground">+20.1% from last year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Funds Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹32,75,000</div>
              <p className="text-xs text-muted-foreground">72.8% of total funds</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹12,25,000</div>
              <p className="text-xs text-muted-foreground">27.2% of total funds</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="monthly">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <LineChart className="h-4 w-4" />
                <span className="sr-only">Line chart</span>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <BarChart className="h-4 w-4" />
                <span className="sr-only">Bar chart</span>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <PieChart className="h-4 w-4" />
                <span className="sr-only">Pie chart</span>
              </Button>
            </div>
          </div>
          <TabsContent value="monthly" className="space-y-4">
            <Chart
              type="line"
              options={{
                chart: {
                  id: "donations",
                  toolbar: {
                    show: false,
                  },
                },
                xaxis: {
                  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                },
                stroke: {
                  curve: "smooth",
                },
                colors: ["#f97316", "#84cc16"],
                legend: {
                  position: "top",
                },
              }}
              series={[
                {
                  name: "Donations",
                  data: [
                    350000, 420000, 380000, 450000, 520000, 480000, 550000, 570000, 600000, 650000, 700000, 750000,
                  ],
                },
                {
                  name: "Expenses",
                  data: [
                    250000, 300000, 280000, 320000, 380000, 350000, 400000, 420000, 450000, 480000, 520000, 550000,
                  ],
                },
              ]}
              height={350}
            />
          </TabsContent>
          <TabsContent value="quarterly" className="space-y-4">
            <Chart
              type="line"
              options={{
                chart: {
                  id: "donations-quarterly",
                  toolbar: {
                    show: false,
                  },
                },
                xaxis: {
                  categories: ["Q1", "Q2", "Q3", "Q4"],
                },
                stroke: {
                  curve: "smooth",
                },
                colors: ["#f97316", "#84cc16"],
                legend: {
                  position: "top",
                },
              }}
              series={[
                {
                  name: "Donations",
                  data: [1150000, 1450000, 1720000, 2100000],
                },
                {
                  name: "Expenses",
                  data: [830000, 1050000, 1270000, 1550000],
                },
              ]}
              height={350}
            />
          </TabsContent>
          <TabsContent value="yearly" className="space-y-4">
            <Chart
              type="line"
              options={{
                chart: {
                  id: "donations-yearly",
                  toolbar: {
                    show: false,
                  },
                },
                xaxis: {
                  categories: ["2019", "2020", "2021", "2022", "2023"],
                },
                stroke: {
                  curve: "smooth",
                },
                colors: ["#f97316", "#84cc16"],
                legend: {
                  position: "top",
                },
              }}
              series={[
                {
                  name: "Donations",
                  data: [2500000, 3200000, 3800000, 4200000, 4500000],
                },
                {
                  name: "Expenses",
                  data: [1800000, 2300000, 2700000, 3100000, 3275000],
                },
              ]}
              height={350}
            />
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-4">Donation Purpose Breakdown</h3>
          <Chart
            type="pie"
            options={{
              chart: {
                id: "donation-purpose",
                toolbar: {
                  show: false,
                },
              },
              labels: ["Temple Construction", "Food Distribution", "Festival Celebrations", "Maintenance", "Education"],
              colors: ["#f97316", "#84cc16", "#06b6d4", "#8b5cf6", "#ec4899"],
              legend: {
                position: "bottom",
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 300,
                    },
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              ],
            }}
            series={[35, 25, 20, 15, 5]}
            height={300}
          />
        </div>
      </CardContent>
    </Card>
  )
}

const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  }

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
