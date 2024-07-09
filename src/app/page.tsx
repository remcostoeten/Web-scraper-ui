/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kuWK05QbFzN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useMemo } from "react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"
import { Pie, PieChart, CartesianGrid, XAxis, Bar, BarChart } from "recharts"

export default function Component() {
  const [threshold, setThreshold] = useState(60)
  const [showThreshold, setShowThreshold] = useState(true)
  const deals = [
    {
      id: 1,
      title: "Apple MacBook Pro 16-inch",
      source: "Amazon",
      discount: 25,
      price: 2499.99,
      originalPrice: 2999.99,
    },
    {
      id: 2,
      title: "Sony WH-1000XM4 Headphones",
      source: "Walmart",
      discount: 30,
      price: 278.0,
      originalPrice: 349.99,
    },
    {
      id: 3,
      title: "Samsung Galaxy S22 Ultra",
      source: "MediaMarkt",
      discount: 15,
      price: 899.99,
      originalPrice: 1099.99,
    },
    {
      id: 4,
      title: "Dyson V15 Detect Vacuum Cleaner",
      source: "Amazon",
      discount: 20,
      price: 599.99,
      originalPrice: 749.99,
    },
    {
      id: 5,
      title: "Bose Noise Cancelling Headphones 700",
      source: "Walmart",
      discount: 25,
      price: 379.0,
      originalPrice: 499.99,
    },
    {
      id: 6,
      title: "Nintendo Switch OLED Model",
      source: "MediaMarkt",
      discount: 10,
      price: 349.99,
      originalPrice: 399.99,
    },
  ]
  const filteredDeals = deals.filter((deal) => deal.discount >= threshold)
  const dealsBySource = useMemo(() => {
    return deals.reduce((acc, deal) => {
      if (!acc[deal.source]) {
        acc[deal.source] = { deals: [], totalDiscount: 0 }
      }
      acc[deal.source].deals.push(deal)
      acc[deal.source].totalDiscount += deal.discount
      return acc
    }, {})
  }, [deals])
  const chartData = useMemo(() => {
    return Object.entries(dealsBySource).map(([source, data]) => ({
      label: source,
      value: data.totalDiscount / (data.deals.length * 100),
    }))
  }, [dealsBySource])
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Deal Finder</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">Threshold:</span>
            <Slider value={[threshold]} onValueChange={setThreshold} max={100} step={1} className="w-[200px]" />
            <span className="font-medium">{threshold}%</span>
          </div>
          <Switch
            checked={showThreshold}
            onCheckedChange={setShowThreshold}
            className="[&>div]:bg-primary [&>div]:border-primary"
          >
            <span className="sr-only">Show Threshold</span>
          </Switch>
        </div>
      </div>
      {showThreshold && (
        <div className="bg-background p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Deals above {threshold}% discount</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => (
              <li key={deal.id} className="bg-card p-4 rounded-lg shadow-lg transition-transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold">{deal.title}</h3>
                  <Badge variant="outline" className="bg-primary text-primary-foreground">
                    {deal.discount}% off
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">From {deal.source}</p>
                    <p className="font-medium">${deal.price}</p>
                    <p className="text-muted-foreground line-through">${deal.originalPrice}</p>
                  </div>
                  <Button variant="outline">View Deal</Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="bg-background p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Deal Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Deal Distribution by Source</CardTitle>
            </CardHeader>
            <CardContent>
              <PiechartcustomChart className="w-full aspect-square" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Discount by Source</CardTitle>
            </CardHeader>
            <CardContent>
              <BarchartChart className="w-full aspect-[4/3]" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function BarchartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="min-h-[300px]"
      >
        <BarChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}


function PiechartcustomChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          visitors: {
            label: "Visitors",
          },
          chrome: {
            label: "Chrome",
            color: "hsl(var(--chart-1))",
          },
          safari: {
            label: "Safari",
            color: "hsl(var(--chart-2))",
          },
          firefox: {
            label: "Firefox",
            color: "hsl(var(--chart-3))",
          },
          edge: {
            label: "Edge",
            color: "hsl(var(--chart-4))",
          },
          other: {
            label: "Other",
            color: "hsl(var(--chart-5))",
          },
        }}
      >
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={[
              { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
              { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
              { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
              { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
              { browser: "other", visitors: 90, fill: "var(--color-other)" },
            ]}
            dataKey="visitors"
            nameKey="browser"
          />
        </PieChart>
      </ChartContainer>
    </div>
  )
}
