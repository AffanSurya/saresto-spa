import axios from "axios";
import { Alert, Button, FloatingLabel } from "flowbite-react";
import React, { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface MenuItemProps {
  id?: number;
  name: string;
  price: number | string;
  category: string;
  image: string;
  status?: string;
  total_ordered?: number;
}

interface validationProps {
  message?: string;
  name?: string;
  price?: string;
  category?: string;
  image?: string;
}

interface FormMenuItemProps {
  name?: string;
  price?: number | string;
  category?: string;
  image?: string;
}

const FormMenuItemComponent: React.FC<FormMenuItemProps> = ({
  name = "",
  price = "",
  category = "",
  image = "",
}) => {
  const navigate = useNavigate();
  const [validation, setValidation] = useState<validationProps>({});
  const [menuItems, setMenuItems] = useState<MenuItemProps>({
    name,
    price,
    category,
    image,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const updatedValue =
      name === "price" && value !== "" ? Number(value) : value;

    setMenuItems((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const parsedPrice = parseInt(menuItems.price as string);

    axios
      .post("http://sa-restoV2.test/api/menuItem1/store", menuItems)
      .then(() => {
        navigate("/dashboard/menu-item");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex max-w-md flex-col gap-4"
    >
      {validation.message && (
        <Alert
          color="failure"
          icon={HiInformationCircle}
          className="mb-5"
          onDismiss={() => {
            setValidation({});
          }}
        >
          <span className="font-medium">Info error!</span> {validation.message}
        </Alert>
      )}
      <div>
        <div className="mb-2 block">
          <FloatingLabel
            variant="outlined"
            name="name"
            value={menuItems.name}
            label="Nama Makanan"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <div className="mb-2 block">
          <FloatingLabel
            variant="outlined"
            name="category"
            value={menuItems.category}
            label="Kategori"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <div className="mb-2 block">
          <FloatingLabel
            variant="outlined"
            type="url"
            name="image"
            value={menuItems.image}
            label="URL Gambar"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <div className="mb-2 block">
          <FloatingLabel
            variant="outlined"
            type="number"
            name="price"
            value={menuItems.price}
            label="Harga"
            helperText="Harga dalam Rupiah"
            onChange={handleChange}
            className="no-spinners"
            required
          />
        </div>
      </div>

      <Button type="submit" color="blue">
        Submit
      </Button>
    </form>
  );
};

export default FormMenuItemComponent;
