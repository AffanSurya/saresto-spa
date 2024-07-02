import { format } from "date-fns";
import { Table } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

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

interface OrderTableProps {
  orders: OrderProps[];
  updateStatus: (id: number, status: string) => void;
  changeTo?: string;
}

const OrdersTableComponent: React.FC<OrderTableProps> = ({
  orders,
  updateStatus,
  changeTo,
}) => {
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleClick = (id: number, status: string) => {
    updateStatus(id, status);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>
            Nama <br /> Pemesan
          </Table.HeadCell>
          <Table.HeadCell>Meja</Table.HeadCell>
          <Table.HeadCell>Makanan</Table.HeadCell>
          <Table.HeadCell>Qty</Table.HeadCell>
          <Table.HeadCell>Harga</Table.HeadCell>
          <Table.HeadCell>Total Harga</Table.HeadCell>
          <Table.HeadCell>Waktu Pesan</Table.HeadCell>
          {changeTo !== undefined && (
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          )}
        </Table.Head>
        <Table.Body className="divide-y">
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              {order.order_items.map((item, index) => (
                <Table.Row
                  key={item.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  {index === 0 && (
                    <>
                      <Table.Cell
                        rowSpan={order.order_items.length}
                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                      >
                        {order.user_name}
                      </Table.Cell>
                      <Table.Cell rowSpan={order.order_items.length}>
                        {order.table_number}
                      </Table.Cell>
                    </>
                  )}

                  <Table.Cell>{item.menu_item_name}</Table.Cell>
                  <Table.Cell>{item.quantity}</Table.Cell>
                  <Table.Cell>{formatRupiah(item.price)}</Table.Cell>

                  {index === 0 && (
                    <>
                      <Table.Cell rowSpan={order.order_items.length}>
                        {formatRupiah(order.total_price)}
                      </Table.Cell>
                      <Table.Cell rowSpan={order.order_items.length}>
                        {format(new Date(order.created_at), "dd/MM/yyyy HH:mm")}
                      </Table.Cell>
                      {changeTo !== undefined && (
                        <Table.Cell rowSpan={order.order_items.length}>
                          <Link
                            to={""}
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            onClick={() => handleClick(order.id, changeTo)}
                          >
                            {changeTo.charAt(0).toUpperCase() +
                              changeTo.slice(1)}
                          </Link>
                          <br />
                          <Link
                            to={""}
                            className="font-medium text-red-600 hover:underline dark:text-red-500"
                            onClick={() => handleClick(order.id, "cancelled")}
                          >
                            Cancel
                          </Link>
                        </Table.Cell>
                      )}
                    </>
                  )}
                </Table.Row>
              ))}
            </React.Fragment>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default OrdersTableComponent;
