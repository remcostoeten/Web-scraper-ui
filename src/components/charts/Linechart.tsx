"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", Delivered: 186, Canceled: 80 },
  { month: "February", Delivered: 305, Canceled: 200 },
  { month: "March", Delivered: 237, Canceled: 120 },
  { month: "April", Delivered: 73, Canceled: 190 },
  { month: "May", Delivered: 209, Canceled: 130 },
  { month: "June", Delivered: 214, Canceled: 140 },
];

const chartConfig = {
  Delivered: {
    label: "Delivered",
    color: "hsl(var(--chart-1))",
  },
  Canceled: {
    label: "Canceled",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Succeschart() {
  return (
    <Card className="w-[100%]">
      <CardHeader>
        <CardTitle className="text-3xl">
          Succesfull price faults shipped
        </CardTitle>
        <CardDescription className="">
          Showing total succesfull delivered price faults for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="Canceled"
              type="natural"
              fill="var(--color-Canceled)"
              fillOpacity={0.4}
              stroke="var(--color-Canceled)"
              stackId="a"
            />
            <Area
              dataKey="Delivered"
              type="natural"
              fill="var(--color-Delivered)"
              fillOpacity={0.4}
              stroke="var(--color-Delivered)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-fit items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
