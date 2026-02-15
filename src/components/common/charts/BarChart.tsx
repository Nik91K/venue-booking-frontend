import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@components/ui/chart';

type ChartData = Record<string, string | number>;

type BarChartProps = {
  data: ChartData[];
  config: ChartConfig;
  dataKeys: string[];
  xAxisKey: string;
  xAxisFormat?: (value: string) => string;
  className?: string;
  showGrid?: boolean;
  showLegent?: boolean;
  showTooltip?: boolean;
};

export function BarChartComponent({
  data,
  config,
  dataKeys,
  xAxisKey,
  xAxisFormat,
  className = 'min-h-50 w-full',
  showGrid = true,
  showLegent = true,
  showTooltip = true,
}: BarChartProps) {
  return (
    <ChartContainer config={config} className={className}>
      <BarChart accessibilityLayer data={data}>
        {showGrid && <CartesianGrid vertical={false} />}
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={xAxisFormat}
        />
        {showLegent && <ChartLegend content={<ChartLegendContent />} />}
        {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
        {dataKeys.map(key => (
          <Bar
            key={key}
            dataKey={key}
            fill={config[key]?.color || 'oklch(0.769 0.188 70.08)'}
            radius={4}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
