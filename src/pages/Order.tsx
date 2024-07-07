import { Alert, Button, Spinner, Tabs } from "flowbite-react";
import { TableRadioComponent } from "../components/TableRadio";
import React, { useEffect, useState } from "react";
import { MdDashboard, MdLocalDining } from "react-icons/md";
import { GiCakeSlice, GiDrinkMe } from "react-icons/gi";
import axios from "axios";
import MenuCategoryComponent from "../components/MenuCategory";
import ReviewOrderComponent from "../components/ReviewOrder";
import { HiInformationCircle } from "react-icons/hi";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface MenuItemProps {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  status: string;
}
interface MenuItemResponse {
  data: MenuItemProps[];
}

interface SelectedItem {
  name: string;
  menu_item_id: number;
  quantity: number;
  price: number;
}

export default function Order() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState<SelectedItem[]>(
    [],
  );

  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  const loadUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user`);
      setUserId(response.data.id);
    } catch (error: any) {
      console.error(`Gagal memuat data user dari server: ${error.message}`);
    }
  };

  const loadMenuItems = async () => {
    try {
      const response = await axios.get<MenuItemResponse>(
        `${API_URL}/menuItem1`,
      );
      setMenuItems(response.data.data);
    } catch (error) {
      setError(`Gagal memuat data menu dari server: ${error}`);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/masuk");
    } else {
      loadUser();
      loadMenuItems();
    }
  }, [navigate]);

  const handleTableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTable(event.target.value);
  };

  const handleMenuItemQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: number,
    name: string,
    price: number,
  ) => {
    const quantity = parseInt(event.target.value, 10);

    setSelectedMenuItems((prevSelected) => {
      const existingItem = prevSelected.find(
        (item) => item.menu_item_id === itemId,
      );

      if (quantity === 0) {
        // Jika kuantitas berubah menjadi 0, hapus item dari list
        return prevSelected.filter((item) => item.menu_item_id !== itemId);
      } else if (existingItem) {
        // Jika item sudah ada di list, perbarui kuantitasnya
        // Tidak perlu mengubah price di sini, kecuali Anda ingin logika tersebut
        return prevSelected.map((item) =>
          item.menu_item_id === itemId ? { ...item, quantity } : item,
        );
      } else {
        // Jika item belum ada di list, tambahkan sebagai item baru
        return [
          ...prevSelected,
          { menu_item_id: itemId, name, quantity, price },
        ];
      }
    });
  };

  const handleOrderSubmit = async () => {
    setLoading(true);

    try {
      // langkah 1: membuat order
      const orderData = {
        user_id: userId,
        table_number: parseInt(selectedTable || "", 10),
      };

      const orderResponse = await axios.post(
        `${API_URL}/order/store`,
        orderData,
      );
      const orderId = orderResponse.data.id;

      // langkah 2: membuat order item
      const orderItemData = selectedMenuItems.map((item) => ({
        order_id: orderId,
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        price: item.price * item.quantity,
      }));

      await Promise.all(
        orderItemData.map((item) =>
          axios.post(`${API_URL}/orderItem/store`, item),
        ),
      );

      // langkah 3: update price order
      const orderPrice = selectedMenuItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      await axios.put(`${API_URL}/order/update/${orderId}`, {
        total_price: orderPrice,
      });

      setSuccess("Pesanan berhasil dibuat!");
    } catch (error: any) {
      setError(`Gagal menempatkan pesanan: ${error.message}`);
    } finally {
      setLoading(false);
      setSelectedTable(null);
      setSelectedMenuItems([]);
    }
  };

  const appetizers = menuItems.filter(
    (item) => item.category === "makanan pembuka",
  );

  const mainCourses = menuItems.filter(
    (item) => item.category === "makanan utama",
  );
  const desserts = menuItems.filter(
    (item) => item.category === "pencuci mulut",
  );
  const drinks = menuItems.filter((item) => item.category === "minuman");

  return (
    <div className="text-center">
      <h1 className="mb-2 text-4xl font-bold">Pesan Makanan</h1>

      <p className="mb-4 text-white">
        Selamat datang di halaman pemesanan Sa Resto. Silakan pilih nomor meja
        yang Anda tempati dan pilih menu yang Anda inginkan.
      </p>

      {/* aler error load menu item 1 */}
      {error && (
        <Alert
          color="failure"
          icon={HiInformationCircle}
          className="mb-5"
          onDismiss={() => {
            setError(null);
          }}
        >
          <span className="font-medium">Info error!</span> {error}
        </Alert>
      )}

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

      <Tabs aria-label="Tabs with icons" className="mt-5" variant="underline">
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

      {success && (
        <Alert
          color="success"
          icon={HiInformationCircle}
          className="mb-5"
          onDismiss={() => {
            setSuccess(null);
          }}
        >
          <span className="font-medium">Info success!</span> {success}
        </Alert>
      )}
      <ReviewOrderComponent
        selectedMenuItems={selectedMenuItems}
        selectedTable={selectedTable}
      />

      <div className="mt-5 flex justify-end">
        <Button
          color="blue"
          className="w-36"
          onClick={handleOrderSubmit}
          disabled={!selectedTable || selectedMenuItems.length === 0 || loading}
        >
          {loading ? (
            <>
              <Spinner color="info" aria-label="Info spinner example" />
              <span className="pl-3">Memproses...</span>
            </>
          ) : (
            "Pesan Sekarang"
          )}
        </Button>
      </div>
    </div>
  );
}
