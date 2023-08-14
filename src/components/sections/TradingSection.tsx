import { ComposedChart, Line, ResponsiveContainer, YAxis } from "recharts";
import TradingData from "../../data/trading.json";

import Image from "next/image";
import { forwardRef } from "react";

const calculateMovingAverage = (prices: number[]) => {
  const output = [{ price: prices[0] as number, avg: prices[0] as number, avg2: prices[0] as number, avg3: prices[0] as number }];
  for (let i = 1; i < prices.length; i++) {
    const start = Math.max(0, i - 7);
    const start2 = Math.max(0, i - 25);
    const start3 = Math.max(0, i - 120);

    output.push({
      price: prices[i] as number,
      avg: prices.slice(start, i).reduce((a, b) => a + b, 0) / (i - start),
      avg2: prices.slice(start2, i).reduce((a, b) => a + b, 0) / (i - start2),
      avg3: prices.slice(start3, i).reduce((a, b) => a + b, 0) / (i - start3),
    });
  }
  return output;
};

interface TradingSectionProps {
  subtitle?: string;
  title: string;
  description: string[];
}

const TradingSection = forwardRef<HTMLElement, TradingSectionProps>(({ description, title, subtitle }, ref) => {
  const minPrice = Math.min(...TradingData.map((data) => data.askPrice));
  const maxPrice = Math.max(...TradingData.map((data) => data.askPrice));
  const movingAverage = calculateMovingAverage(TradingData.map((data) => data.askPrice).reverse());

  return (
    <section id="Trading Section" className="mx-auto mt-12 lg:mt-24 lg:grid max-w-7xl grid-cols-3 gap-8 px-4" ref={ref}>

      <div className="relative col-span-2 hidden lg:block mt-8 lg:mt-0">
        <div className="absolute top-[4%] left-[4%] flex items-end gap-2 rounded-md border border-main-light bg-main-border p-4">
          <Image src="/bitcoin.png" width={30} height={30} alt="Bitcoin" />
          <h1 className="text-2xl font-bold text-white">Bitcoin</h1>
          <h2 className="mb-0.5 text-sm text-white">BTC</h2>
        </div>
        <ResponsiveContainer className="rounded-md border border-main-border bg-main-medium" height={500}>
          <ComposedChart data={movingAverage.slice(40)}>
            <Line type="linear" dataKey="price" stroke="#7F79A3" strokeWidth={2} dot={false} animationDuration={250} activeDot={{ r: 3 }} />
            <Line type="monotone" dataKey="avg" stroke="#5ABDDE" strokeWidth={1} strokeOpacity={1} dot={false} animationDuration={250} activeDot={{ r: 3 }} />
            <Line type="monotone" dataKey="avg2" stroke="#5ABDDE" strokeWidth={1} strokeOpacity={1} dot={false} animationDuration={250} activeDot={{ r: 3 }} />
            <Line type="monotone" dataKey="avg3" stroke="#7F79A3" strokeWidth={1} strokeOpacity={1} dot={false} animationDuration={250} activeDot={{ r: 3 }} />
            <YAxis domain={[minPrice, maxPrice]} hide={true} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div>
        <h1 className="font-semibold uppercase text-info-light">{subtitle}</h1>
        <h2 className="mb-4 text-4xl font-bold text-white">{title}</h2>
        <div className="space-y-4">
          {description.map((paragraph) => (
            <p key={paragraph} className="text-main-light">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="relative col-span-2 hidden xs:block mt-8 lg:mt-0 lg:hidden">
        <div className="absolute top-[4%] left-[4%] flex items-end gap-2 rounded-md border border-main-light bg-main-border p-4">
          <Image src="/bitcoin.png" width={30} height={30} alt="Bitcoin" />
          <h1 className="text-2xl font-bold text-white">Bitcoin</h1>
          <h2 className="mb-0.5 text-sm text-white">BTC</h2>
        </div>
        <ResponsiveContainer className="rounded-md border border-main-border bg-main-medium" height={300}>
          <ComposedChart data={movingAverage.slice(40)}>
            <Line type="linear" dataKey="price" stroke="#7F79A3" strokeWidth={2} dot={false} animationDuration={250} activeDot={{ r: 3 }} />
            <Line type="monotone" dataKey="avg" stroke="#5ABDDE" strokeWidth={1} strokeOpacity={1} dot={false} animationDuration={250} activeDot={{ r: 3 }} />
            <Line type="monotone" dataKey="avg2" stroke="#5ABDDE" strokeWidth={1} strokeOpacity={1} dot={false} animationDuration={250} activeDot={{ r: 3 }} />
            <Line type="monotone" dataKey="avg3" stroke="#7F79A3" strokeWidth={1} strokeOpacity={1} dot={false} animationDuration={250} activeDot={{ r: 3 }} />
            <YAxis domain={[minPrice, maxPrice]} hide={true} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
});
TradingSection.displayName = "TradingSection";

export default TradingSection;
