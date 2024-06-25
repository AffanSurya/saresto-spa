import React from "react";
import CardMenu from "./CardMenu";

interface MenuItemProps {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  status: string;
}

interface SelectedItemProps {
  name: string;
  menu_item_id: number;
  quantity: number;
  price: number;
}

interface MenuCategoryProps {
  title: string;
  menuItems: MenuItemProps[];
  selectedMenuItems: SelectedItemProps[];
  handleMenuItemQuantityChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: number,
    name: string,
    price: number,
  ) => void;
}

const MenuCategoryComponent: React.FC<MenuCategoryProps> = ({
  menuItems,
  selectedMenuItems,
  handleMenuItemQuantityChange,
}) => {
  const updateQuantity = (
    itemId: number,
    delta: number,
    name: string,
    price: number,
  ) => {
    const selectedItem = selectedMenuItems.find(
      (item) => item.menu_item_id === itemId,
    );
    const currentQuantity = selectedItem ? selectedItem.quantity : 0;
    const newQuantity = Math.max(currentQuantity + delta, 0);

    const fakeEvent = {
      target: { value: newQuantity.toString() },
    } as React.ChangeEvent<HTMLInputElement>;

    handleMenuItemQuantityChange(fakeEvent, itemId, name, price);
  };

  return (
    <div className="my-8 text-left">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {menuItems.map((item) => (
          <CardMenu
            key={item.id}
            item={item}
            selectedQuantity={
              selectedMenuItems.find(
                (selectedItem) => selectedItem.menu_item_id === item.id,
              )?.quantity || 0
            }
            handleUpdateQuantity={(delta) =>
              updateQuantity(item.id, delta, item.name, item.price)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default MenuCategoryComponent;
