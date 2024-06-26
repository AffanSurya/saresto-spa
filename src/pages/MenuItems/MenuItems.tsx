import { useEffect, useState } from "react";
import MenuItemsTableComponent from "../../components/MenuItemsTable";
import axios from "axios";
import { Alert, Button } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

interface MenuItemProps {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  status: string;
  total_ordered: number;
}
interface MenuItemResponse {
  data: MenuItemProps[];
}

export default function MenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadMenuItems = async () => {
    try {
      const response = await axios.get<MenuItemResponse>(
        "http://sa-restoV2.test/api/menuItem1",
      );
      console.log(`hah ${response.data.data}`);

      setMenuItems(response.data.data);
    } catch (error) {
      setError(`Gagal memuat data menu dari server: ${error}`);
    }
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  return (
    <div className="text-center">
      <h1 className="mb-2 text-4xl font-bold">Menu Makanan</h1>

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

      <div className="mt-5 flex justify-end">
        <Button color="blue" className="w-36">
          Tambah
        </Button>
      </div>

      <MenuItemsTableComponent menuItems={menuItems} />
    </div>
  );
}
