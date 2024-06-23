import React from "react";
import CardMenu from "./CardMenu";

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

interface MenuCategoryProps {
  title: string;
  menuItems: MenuItem[];
  selectedMenuItems: SelectedItem[];
  handleMenuItemQuantityChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    itemName: string,
  ) => void;
}

const MenuCategoryComponent: React.FC<MenuCategoryProps> = ({
  title,
  menuItems,
  selectedMenuItems,
  handleMenuItemQuantityChange,
}) => {
  const updateQuantity = (itemName: string, delta: number) => {
    const selectedItem = selectedMenuItems.find(
      (item) => item.name === itemName,
    );
    const currentQuantity = selectedItem ? selectedItem.quantity : 0;
    const newQuantity = Math.max(currentQuantity + delta, 0);

    const fakeEvent = {
      target: { value: newQuantity.toString() },
    } as React.ChangeEvent<HTMLInputElement>;

    handleMenuItemQuantityChange(fakeEvent, itemName);
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
                (selectedItem) => selectedItem.name === item.name,
              )?.quantity || 0
            }
            handleUpdateQuantity={(delta) => updateQuantity(item.name, delta)}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuCategoryComponent;
