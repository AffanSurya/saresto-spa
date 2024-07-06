import { Button, Label, TextInput } from "flowbite-react";
import React from "react";

interface FormLoginProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  validation: any;
}

const FormLoginComponent: React.FC<FormLoginProps> = ({
  handleChange,
  handleSubmit,
  validation,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 sm:px-5 md:px-10"
    >
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

      <div className="md:col-span-2">
        <Button className="mt-4 w-full" type="submit" color="blue">
          Daftar Sekarang
        </Button>
      </div>
    </form>
  );
};

export default FormLoginComponent;
