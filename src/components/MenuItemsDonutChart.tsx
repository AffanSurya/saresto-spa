import { ApexOptions } from "apexcharts";
import { useThemeMode } from "flowbite-react";
import React from "react";
import Chart from "react-apexcharts";

interface MenuItemsDonutChartProps {
  names: string[];
  totalOrdered: number[];
}

const MenuItemsDonutChartComponent: React.FC<MenuItemsDonutChartProps> = ({
  names,
  totalOrdered,
}) => {
  const { mode } = useThemeMode();

  const options: ApexOptions = {
    chart: {
      id: "menu-items-donut-chart",
      toolbar: {
        tools: {
          download: true,
        },
      },
    },
    labels: names,
    theme: {
      mode: mode === "dark" ? "dark" : "light",
    },
  };

  const series = totalOrdered;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
        Statistik Menu
      </h2>
      <Chart options={options} series={series} type="donut" width={600} />
    </div>
  );
};

export default MenuItemsDonutChartComponent;
