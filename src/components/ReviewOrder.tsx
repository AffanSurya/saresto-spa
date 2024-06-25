import React from "react";
import ListReviewOrderComponent from "./ListReviewOrder";

interface SelectedItemsProps {
  name: string;
  menu_item_id: number;
  quantity: number;
  price: number;
}

interface ReviewOrderProps {
  selectedMenuItems: SelectedItemsProps[];
  selectedTable: string | null;
}

const ReviewOrderComponent: React.FC<ReviewOrderProps> = ({
  selectedMenuItems,
  selectedTable,
}) => {
  const totalHarga = selectedMenuItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <section className="my-8 text-left">
      <h2 className="mb-4 text-2xl font-semibold">Tinjau Pesanan Anda</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">
          Meja: {selectedTable ?? "Belum memilih"}
        </h3>
      </div>

      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {selectedMenuItems.map((item) => (
          <ListReviewOrderComponent
            key={item.menu_item_id}
            name={item.name}
            quantity={item.quantity}
            price={item.quantity * item.price}
          />
        ))}

        <ListReviewOrderComponent
          name="Total Harga"
          quantity={""}
          price={totalHarga}
        />
      </ul>
    </section>
  );
};

export default ReviewOrderComponent;
