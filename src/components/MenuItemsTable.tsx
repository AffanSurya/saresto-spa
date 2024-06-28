import { Avatar, Table } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

interface MenuItemProps {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  status: string;
  total_ordered: number;
}

interface MenuItemTableProps {
  menuItems: MenuItemProps[];
}

const MenuItemsTableComponent: React.FC<MenuItemTableProps> = ({
  menuItems,
}) => {
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="mt-5 overflow-x-auto ">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Gambar</Table.HeadCell>
          <Table.HeadCell>Nama Makanan</Table.HeadCell>
          <Table.HeadCell>Kategori</Table.HeadCell>
          <Table.HeadCell>Harga</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {menuItems.map((item) => (
            <Table.Row
              key={item.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>
                <Avatar img={item.image} size="lg" />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.name}
              </Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell>{formatRupiah(item.price)}</Table.Cell>
              <Table.Cell>{item.status}</Table.Cell>
              <Table.Cell>
                <Link
                  to={`/dashboard/menu-item/edit/${item.id}`}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </Link>
                {" | "}
                <Link
                  to="#"
                  className="font-medium text-red-600 hover:underline dark:text-red-500"
                >
                  Hapus
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default MenuItemsTableComponent;
