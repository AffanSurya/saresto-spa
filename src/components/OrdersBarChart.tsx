import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import axios from "axios";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface orderStatsProps {
  month: string;
  count: number;
}

const OrdersBarChartComponent: React.FC = () => {
  const [orderStats, setOrderStats] = useState<orderStatsProps[]>([]);
  const token = localStorage.getItem("token");

  const loadOrderStats = async () => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(`${API_URL}/order/statistics`);
        setOrderStats(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to load order statistics:", error);
      }
    }
  };

  useEffect(() => {
    loadOrderStats();
  }, []);

  const months = orderStats.map((stat) => stat.month);
  const counts = orderStats.map((stat) => stat.count);

  //   console.log(months, counts);

  const options: ApexOptions = {
    chart: {
      id: "orders-bar-chart",
      toolbar: {
        tools: {
          download: true,
        },
      },
      foreColor: "#f5f5f5",
      background: "#333",
    },
    xaxis: {
      categories: months,
      labels: {
        format: "MMM yyyy",
      },
    },
    theme: {
      mode: "dark",
    },
  };

  const series = [
    {
      name: "Orders",
      data: counts,
    },
  ];

  return (
    <div className="mt-5">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default OrdersBarChartComponent;
