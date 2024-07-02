import { Alert, Tabs } from "flowbite-react";
import {
  HiAdjustments,
  HiClipboardList,
  HiInformationCircle,
  HiUserCircle,
} from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import OrdersTableComponent from "../../components/OrdersTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

interface OrderProps {
  id: number;
  user_name: string;
  table_number: string;
  total_price: number;
  order_items: OrderItemProps[];
  status: string;
  created_at: string;
  updated_at: string;
}

interface OrderItemProps {
  id: number;
  menu_item_name: string;
  quantity: number;
  price: number;
}

export default function Orders() {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadOrders = () => {
    axios
      .get(`${API_URL}/order`)
      .then((response) => {
        const sortedOrders = response.data.data.sort(
          (a: OrderProps, b: OrderProps) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        );
        setOrders(sortedOrders);
      })
      .catch((error) => {
        setError(`Gagal memuat data pesanan dari server: ${error}`);
      });
  };

  const handleUpdateStatus = (id: number, status: string) => {
    axios
      .put(`${API_URL}/order/update/${id}`, { status: status })
      .then(() => {
        loadOrders();
        setSuccess("Berhasil mengubah status pesanan");
      })
      .catch((error) => {
        setError(`Gagal mengubah status pesanan: ${error}`);
      });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const pendings = orders.filter((order) => order.status === "pending");
  const processings = orders.filter((order) => order.status === "processing");
  const completeds = orders.filter((order) => order.status === "completed");
  const cancelleds = orders.filter((order) => order.status === "cancelled");

  return (
    <div className="">
      <h1 className="mb-2 text-center text-4xl font-bold">Atur Pesanan</h1>

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
      {success && (
        <Alert
          color="success"
          icon={HiInformationCircle}
          className="mb-5"
          onDismiss={() => {
            setSuccess(null);
          }}
        >
          <span className="font-medium">Info Success!</span> {success}
        </Alert>
      )}

      <Tabs aria-label="Tabs with underline" variant="underline">
        <Tabs.Item active title="Pending" icon={HiUserCircle}>
          <OrdersTableComponent
            orders={pendings}
            updateStatus={handleUpdateStatus}
            changeTo="processing"
          />
        </Tabs.Item>
        <Tabs.Item title="Processing" icon={MdDashboard}>
          <OrdersTableComponent
            orders={processings}
            updateStatus={handleUpdateStatus}
            changeTo="completed"
          />
        </Tabs.Item>
        <Tabs.Item title="Completed" icon={HiAdjustments}>
          <OrdersTableComponent
            orders={completeds}
            updateStatus={handleUpdateStatus}
          />
        </Tabs.Item>
        <Tabs.Item title="Cancelled" icon={HiClipboardList}>
          <OrdersTableComponent
            orders={cancelleds}
            updateStatus={handleUpdateStatus}
          />
        </Tabs.Item>
      </Tabs>
    </div>
  );
}
