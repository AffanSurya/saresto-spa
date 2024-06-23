import { Button, Tabs } from "flowbite-react";
import { TableRadioComponent } from "../components/TableRadio";
import React, { useEffect, useState } from "react";
import { MdDashboard, MdLocalDining } from "react-icons/md";
import { GiCakeSlice, GiDrinkMe } from "react-icons/gi";
import axios from "axios";
import MenuCategoryComponent from "../components/MenuCategory";

// Definisikan tipe data untuk item menu
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  status: string;
}
interface MenuItemResponse {
  data: MenuItem[];
}

// Contoh data menu
// const menuItems: Record<string, MenuItem[]> = {
//   appetizers: [
//     { id: 1, name: "Bruschetta" },
//     { id: 2, name: "Stuffed Mushrooms" },
//   ],
//   mainCourses: [
//     { id: 1, name: "Grilled Chicken" },
//     { id: 2, name: "Steak" },
//   ],
//   desserts: [
//     { id: 1, name: "Cheesecake" },
//     { id: 2, name: "Chocolate Cake" },
//   ],
//   beverages: [
//     { id: 1, name: "Lemonade" },
//     { id: 2, name: "Iced Tea" },
//   ],
// };

// Definisikan tipe data untuk kuantitas item
interface SelectedItem {
  name: string;
  quantity: number;
}

export default function Order() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState<SelectedItem[]>(
    [],
  );
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMenuItems = async () => {
    try {
      const response = await axios.get<MenuItemResponse>(
        "http://sa-restoV2.test/api/menuItem1",
      );
      setMenuItems(response.data.data);
    } catch (error) {
      alert(`Gagal memuat data menu dari server: ${error}`);
    }
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  const handleTableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTable(event.target.value);
  };

  const handleMenuItemQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemName: string,
  ) => {
    const quantity = parseInt(event.target.value, 10);

    setSelectedMenuItems((prevSelected) => {
      const existingItem = prevSelected.find((item) => item.name === itemName);

      if (existingItem) {
        // Jika item sudah ada di list, perbarui kuantitasnya
        return prevSelected.map((item) =>
          item.name === itemName ? { ...item, quantity } : item,
        );
      } else {
        // Jika item belum ada di list, tambahkan sebagai item baru
        return [...prevSelected, { name: itemName, quantity }];
      }
    });
  };

  const handleOrderSubmit = () => {
    // Logika untuk mengirim pesanan
    alert(
      `Pesanan Anda telah diterima untuk meja nomor ${selectedTable} dengan pesanan: ${selectedMenuItems
        .map((item) => `${item.name} (x${item.quantity})`)
        .join(", ")}`,
    );
  };

  const appetizers = menuItems.filter(
    (item) => item.category === "makanan pembuka",
  );
  // console.log(`Appetizers ${JSON.stringify(appetizers, null, 2)}`);

  const mainCourses = menuItems.filter(
    (item) => item.category === "makanan utama",
  );
  const desserts = menuItems.filter(
    (item) => item.category === "pencuci mulut",
  );
  const drinks = menuItems.filter((item) => item.category === "minuman");

  return (
    <div className="p-4 text-center">
      <h1 className="mb-2 text-4xl font-bold">Pesan Makanan</h1>

      <p className="mb-4 text-left">
        Selamat datang di halaman pemesanan Sa Resto. Silakan pilih nomor meja
        yang Anda tempati dan pilih menu yang Anda inginkan.
      </p>

      <fieldset className="grid w-full gap-6">
        <legend className="mb-4 text-left">
          Pilih Nomor Meja yang Anda Tempati
        </legend>

        <div className="grid grid-cols-5 gap-4 p-4 md:grid-cols-10">
          {Array.from({ length: 20 }, (_, index) => (
            <TableRadioComponent
              key={index}
              id={`table-${index + 1}`}
              name="table_number"
              value={`${index + 1}`}
              labelText={`${index + 1}`}
              onChange={handleTableChange}
              checked={selectedTable === `${index + 1}`}
            />
          ))}
        </div>
      </fieldset>

      <Tabs aria-label="Tabs with icons">
        <Tabs.Item title="Makanan Pembuka" icon={MdLocalDining}>
          <MenuCategoryComponent
            title="Makanan Pembuka"
            menuItems={appetizers}
            selectedMenuItems={selectedMenuItems}
            handleMenuItemQuantityChange={handleMenuItemQuantityChange}
          />
        </Tabs.Item>
        <Tabs.Item title="Makanan Utama" icon={MdDashboard}>
          <MenuCategoryComponent
            title="Makanan Utama"
            menuItems={mainCourses}
            selectedMenuItems={selectedMenuItems}
            handleMenuItemQuantityChange={handleMenuItemQuantityChange}
          />
        </Tabs.Item>
        <Tabs.Item title="Pencuci Mulut" icon={GiCakeSlice}>
          <MenuCategoryComponent
            title="Pencuci Mulut"
            menuItems={desserts}
            selectedMenuItems={selectedMenuItems}
            handleMenuItemQuantityChange={handleMenuItemQuantityChange}
          />
        </Tabs.Item>
        <Tabs.Item title="Minuman" icon={GiDrinkMe}>
          <MenuCategoryComponent
            title="Minuman"
            menuItems={drinks}
            selectedMenuItems={selectedMenuItems}
            handleMenuItemQuantityChange={handleMenuItemQuantityChange}
          />
        </Tabs.Item>
      </Tabs>

      <section className="my-8 text-left">
        <h2 className="mb-4 text-2xl font-semibold">Tinjau Pesanan Anda</h2>
        <p>Meja yang dipilih: {selectedTable}</p>
        <p>
          Menu yang dipilih:{" "}
          {selectedMenuItems
            .map((item) => `${item.name} (x${item.quantity})`)
            .join(", ")}
        </p>
      </section>

      <div className="col-span-1 col-start-4 mt-5 md:col-start-5">
        <Button color="blue" className="w-32" onClick={handleOrderSubmit}>
          Konfirmasi Pesanan
        </Button>
      </div>
    </div>
  );
}
