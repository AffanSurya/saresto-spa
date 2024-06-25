import { IoClose } from "react-icons/io5";

interface ListReviewOrderProps {
  name: string;
  quantity: number | string;
  price: number;
}

const ListReviewOrderComponent: React.FC<ListReviewOrderProps> = ({
  name,
  quantity,
  price,
}) => {
  const formatRupiah = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        {/* <div className="shrink-0">gambar</div> */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {name}
          </p>
          <p className=" truncate text-sm text-gray-500 dark:text-gray-400">
            {quantity === "" ? "" : `x ${quantity} `}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          Rp {formatRupiah(price)}
        </div>
      </div>
    </li>
  );
};

export default ListReviewOrderComponent;
