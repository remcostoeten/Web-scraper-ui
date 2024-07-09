import { LineData } from "@/core/data/line-chart-data";
import { LineChart, CartesianGrid, XAxis, Line } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

function LinechartChart(props) {
    return (
        <div {...props}>
            <ChartContainer
                config={{
                    desktop: {
                        label: "Desktop",
                        color: "hsl(var(--chart-1))",
                    },
                }}
            >
                <LineChart
                    accessibilityLayer
                    data={LineData}
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
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Line dataKey="d" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                </LineChart>
            </ChartContainer>
        </div>
    )
}
