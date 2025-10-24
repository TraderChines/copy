"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface PerformanceChartProps {
  data: {
    name: string;
    profit: number;
    cumulativeProfit: number;
  }[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  const chartConfig = {
    profit: {
      label: "Lucro Acumulado",
      color: "hsl(var(--chart-1))",
    },
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => formatCurrency(value as number)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent 
            labelFormatter={(label, payload) => {
                const data = payload?.[0]?.payload;
                if (data) {
                    return (
                        <div>
                            <p>{data.name}</p>
                        </div>
                    );
                }
                return label;
            }}
            formatter={(value) => formatCurrency(value as number)} 
            indicator="dot" />}
        />
        <Area
          dataKey="cumulativeProfit"
          type="natural"
          fill="var(--color-profit)"
          fillOpacity={0.4}
          stroke="var(--color-profit)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}
