// import { useState } from "react";
import { useEffect } from "react";
import FormMenuItemComponent from "../../components/FormMenuItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateMenuItem() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/masuk");
    }
  }, [navigate]);

  return (
    <div>
      <h1 className="mb-2 text-center text-4xl font-bold">Tambah Makanan</h1>

      <FormMenuItemComponent to="store" />
    </div>
  );
}
