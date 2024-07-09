import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import axios from "axios";
import { API_URL } from "../config";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  status: string;
  total_ordered: number;
}

const TopMenuItemsComponent: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/top-menu-items`)
      .then((response) => {
        setMenuItems(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the menu items!", error);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {menuItems.map((item) => (
        <Card key={item.id} imgSrc={item.image} className="w-64 ">
          <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {item.name}
          </h5>
          <p className="text-sm font-normal text-gray-700 dark:text-gray-300">
            {item.category}
          </p>
          <p className="text-base font-semibold text-gray-900 dark:text-white">
            Rp {item.price.toLocaleString("id-ID")}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default TopMenuItemsComponent;
