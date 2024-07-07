import { DarkThemeToggle } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import FormLoginComponent from "../components/FormLogin";
import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import axios from "axios";

interface FormValueProps {
  email: string;
  password: string;
}

export default function Login() {
  const [validation, setValidation] = useState({} as any);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValueProps>({
    email: "",
    password: "",
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
      const response = await axios.post(`${API_URL}/login`, formValues);
      const token = response.data.token;

      localStorage.setItem("token", token);

      navigate("/");
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
          Masuk
        </h1>

        <FormLoginComponent
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          validation={validation}
        />

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Belum punya akun?{" "}
          <Link
            to="/daftar"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
