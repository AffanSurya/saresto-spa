import { DarkThemeToggle } from "flowbite-react";
import { FormRegisterComponent } from "../components/FormRegister";

export default function Register() {
  return (
    <div className="-mt-12 flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4 rounded bg-white p-8 shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <img src="/logo-saresto.png" alt="Sa Resto" className="h-28" />
          <DarkThemeToggle />
        </div>
        <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          Daftar
        </h1>
        <FormRegisterComponent />
      </div>
    </div>
  );
}
