import { Button, Label, TextInput } from "flowbite-react";
import React from "react";

interface FormRegisterProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  validation: any;
}

const FormRegisterComponent: React.FC<FormRegisterProps> = ({
  handleChange,
  handleSubmit,
  validation,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="name"
            value="Nama Lengkap"
            color={validation.name && "failure"}
          />
        </div>
        <TextInput
          id="name"
          name="name"
          onChange={handleChange}
          color={validation.name && "failure"}
          helperText={validation.name && validation.name[0]}
          type="text"
          required
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email"
            value="Email"
            color={validation.email && "failure"}
          />
        </div>
        <TextInput
          id="email"
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="name@gmail.com"
          color={validation.email && "failure"}
          helperText={validation.email && validation.email[0]}
          required
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password"
            value="Kata Sandi"
            color={validation.password && "failure"}
          />
        </div>
        <TextInput
          id="password"
          name="password"
          onChange={handleChange}
          type="password"
          color={validation.password && "failure"}
          helperText={
            validation.password ? validation.password[0] : "Minimal 8 karakter"
          }
          required
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password_confirmation"
            value="Konfirmasi Kata Sandi"
            color={validation.password && "failure"}
          />
        </div>
        <TextInput
          id="password_confirmation"
          name="password_confirmation"
          onChange={handleChange}
          type="password"
          helperText={
            validation.password ? validation.password[0] : "Minimal 8 karakter"
          }
          color={validation.password && "failure"}
          required
          shadow
        />
      </div>

      <div className="md:col-span-2">
        <Button className="mt-4 w-full" type="submit">
          Daftar Sekarang
        </Button>
      </div>
    </form>
  );
};

export default FormRegisterComponent;
