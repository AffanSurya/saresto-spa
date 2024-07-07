import { useEffect, useState } from "react";
import MenuItemsTableComponent from "../../components/MenuItemsTable";
import axios from "axios";
import { Alert, Button } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

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
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadMenuItems = async () => {
    try {
      const response = await axios.get<MenuItemResponse>(
        `${API_URL}/menuItem1`,
      );

      setMenuItems(response.data.data);
    } catch (error: any) {
      setError(`Gagal memuat data menu dari server: ${error.message}`);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/masuk");
    } else {
      loadMenuItems();
    }
  }, [navigate]);

  const handleDelete = async (id: number, name: string) => {
    try {
      await axios.delete(`${API_URL}/menuItem1/delete/${id}`);
      setDeleteSuccess(`Makanan ${name} berhasil dihapus`);
      loadMenuItems();
    } catch (error: any) {
      setError(`Gagal menghapus data menu dari server: ${error.message}`);
    }
  };

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

      {deleteSuccess && (
        <Alert
          color="success"
          icon={HiInformationCircle}
          className="mb-5"
          onDismiss={() => {
            setDeleteSuccess(null);
          }}
        >
          <span className="font-medium">Info sukses!</span> {deleteSuccess}
        </Alert>
      )}

      <div className="mt-5 flex justify-end">
        <Link to="/dashboard/menu-item/create">
          <Button color="blue" className="w-36">
            Tambah
          </Button>
        </Link>
      </div>

      <MenuItemsTableComponent menuItems={menuItems} onDelete={handleDelete} />
    </div>
  );
}
