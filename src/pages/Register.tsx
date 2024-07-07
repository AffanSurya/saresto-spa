import { DarkThemeToggle } from "flowbite-react";
import FormRegisterComponent from "../components/FormRegister";
import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface FormValueProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function Register() {
  const [validation, setValidation] = useState({} as any);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValueProps>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post(`${API_URL}/register`, formValues);

      navigate("/masuk");
    } catch (error: any) {
      setValidation(error.response.data);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <div className="-mt-12 flex min-h-screen items-center justify-center">
      <div className="w-full max-w-xl space-y-8 rounded bg-white p-8 shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between border-b border-gray-300 pb-4 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <img src="/logo-saresto.png" alt="Sa Resto" className="h-20" />
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Sa Resto
            </span>
          </div>
          <DarkThemeToggle />
        </div>
        <h1 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
          Daftar
        </h1>
        <FormRegisterComponent
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          validation={validation}
        />

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Sudah punya akun?{" "}
          <Link
            to="/masuk"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
