import axios from "axios";
import { Alert, Button, FloatingLabel, Label, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

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
  method?: "POST" | "PUT";
  to: string;
  inValidation?: validationProps;
}

const FormMenuItemComponent: React.FC<FormMenuItemProps> = ({
  name = "",
  price = "",
  category = "",
  image = "",
  to,
  method = "POST",
  inValidation,
}) => {
  const navigate = useNavigate();
  const [validation, setValidation] = useState<validationProps>({});
  const [menuItems, setMenuItems] = useState<MenuItemProps>({
    name,
    price,
    category,
    image,
  });

  useEffect(() => {
    setMenuItems({
      name,
      price,
      category,
      image,
    });
  }, [name, price, category, image]);

  useEffect(() => {
    if (inValidation !== undefined) {
      setValidation(inValidation);
    } else {
      setValidation({});
    }
  }, [inValidation]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const updatedValue =
      name === "price" && value !== "" ? Number(value) : value;

    setMenuItems((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setMenuItems((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = `${API_URL}/menuItem1/${to}`;

    if (method === "PUT") {
      axios
        .put(url, menuItems)
        .then(() => {
          navigate("/dashboard/menu-item");
        })
        .catch((error) => {
          setValidation(error.response.data);
        });
    } else {
      axios
        .post(url, menuItems)
        .then(() => {
          navigate("/dashboard/menu-item");
        })
        .catch((error) => {
          setValidation(error.response.data);
        });
    }
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
        {/* <div className="mb-2 block">
          <FloatingLabel
            variant="outlined"
            name="category"
            value={menuItems.category}
            label="Kategori"
            onChange={handleChange}
            required
          />
        </div> */}

        <div className="mb-2 block">
          <Label htmlFor="category" value="Pilih Kategori Makanan" />
        </div>
        <Select
          id="category"
          name="category"
          value={menuItems.category}
          onChange={handleSelect}
          required
        >
          <option disabled value="">
            Pilih Disini
          </option>
          <option value="makanan pembuka">makanan pembuka</option>
          <option value="makanan utama">makanan utama</option>
          <option value="pencuci mulut">pencuci mulut</option>
          <option value="minuman">minuman</option>
        </Select>
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
