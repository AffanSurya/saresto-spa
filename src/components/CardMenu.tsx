import React from "react";
import { Card } from "flowbite-react";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  status: string;
}

interface SelectedItem {
  name: string;
  quantity: number;
}

interface CardMenuProps {
  item: MenuItem;
  selectedQuantity: number;
  handleUpdateQuantity: (delta: number) => void;
}

const CardMenuComponent: React.FC<CardMenuProps> = ({
  item,
  selectedQuantity,
  handleUpdateQuantity,
}) => {
  const formatRupiah = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <Card
      key={item.id}
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={item.image}
    >
      <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
        {item.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Rp {formatRupiah(item.price)}
      </p>

      <div className="relative flex items-center">
        <button
          type="button"
          onClick={() => handleUpdateQuantity(-1)}
          className="inline-flex size-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            className="size-2.5 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          className="max-w-10 shrink-0 border-0 bg-transparent text-center text-sm font-normal text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
          placeholder=""
          value={selectedQuantity}
          readOnly
        />
        <button
          type="button"
          onClick={() => handleUpdateQuantity(1)}
          className="inline-flex size-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            className="size-2.5 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </Card>
  );
};

export default CardMenuComponent;
