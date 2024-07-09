import React from "react";

import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useThemeMode } from "flowbite-react";

interface OrdersBarChartProps {
  months: string[];
  counts: number[];
}

const OrdersBarChartComponent: React.FC<OrdersBarChartProps> = ({
  months,
  counts,
}) => {
  const { mode } = useThemeMode();

  const options: ApexOptions = {
    chart: {
      id: "orders-bar-chart",
      toolbar: {
        tools: {
          download: true,
        },
      },
    },
    xaxis: {
      categories: months,
      labels: {
        format: "MMM yyyy",
      },
    },
    theme: {
      mode: mode === "dark" ? "dark" : "light",
    },
  };

  const series = [
    {
      name: "Orders",
      data: counts,
    },
  ];

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
        Pesanan Bulanan
      </h2>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default OrdersBarChartComponent;
