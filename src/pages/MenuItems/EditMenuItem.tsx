// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormMenuItemComponent from "../../components/FormMenuItem";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

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

export default function EditMenuItem() {
  const { id } = useParams<{ id: string }>();
  const [validation, setValidation] = useState<validationProps>({});
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItemProps>({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  const getMenuItem = useCallback(() => {
    axios
      .get(`${API_URL}/menuItem1/show/${id}`)
      .then((response) => {
        const { name, price, category, image } = response.data.data;

        setMenuItems({ name, price, category, image });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setValidation(error.response.data);
        } else {
          console.error(error);
        }
      });
  }, [id]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/masuk");
    } else {
      getMenuItem();
    }
  }, [navigate, getMenuItem]);

  return (
    <div>
      <h1 className="mb-2 text-center text-4xl font-bold">Edit Makanan</h1>

      <FormMenuItemComponent
        to={`update/${id}`}
        name={menuItems.name}
        price={menuItems.price}
        category={menuItems.category}
        image={menuItems.image}
        inValidation={validation}
        method="PUT"
      />
    </div>
  );
}
