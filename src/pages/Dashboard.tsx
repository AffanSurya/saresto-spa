import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrdersBarChartComponent from "../components/OrdersBarChart";
import axios from "axios";
import { API_URL } from "../config";
import MenuItemsDonutChartComponent from "../components/MenuItemsDonutChart";

interface orderStatsProps {
  month: string;
  count: number;
}

interface MenuItemsProps {
  name: string;
  total_ordered: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [orderStats, setOrderStats] = useState<orderStatsProps[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemsProps[]>([]);
  const token = localStorage.getItem("token");

  const loadOrderStats = useCallback(async () => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(`${API_URL}/order/statistics`);
        setOrderStats(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Failed to load order statistics:", error);
      }
    }
  }, [token]);

  const loadMenuItems = useCallback(async () => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(`${API_URL}/menuItem1`);
        setMenuItems(response.data.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Failed to load order statistics:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/masuk");
    }
    loadOrderStats();
    loadMenuItems();
  }, [token, navigate, loadOrderStats, loadMenuItems]);

  const months = orderStats.map((stat) => stat.month);
  const counts = orderStats.map((stat) => stat.count);

  const names = menuItems.map((item) => item.name);
  const total_ordered = menuItems.map((item) => item.total_ordered);

  return (
    <div className="min-h-screen">
      <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-gray-100">
        Dashboard
      </h1>

      <div className="mt-5 space-y-4">
        <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-[#424242]">
          <OrdersBarChartComponent months={months} counts={counts} />
        </div>
        <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-[#424242]">
          <MenuItemsDonutChartComponent
            names={names}
            totalOrdered={total_ordered}
          />
        </div>
      </div>
    </div>
  );
}
