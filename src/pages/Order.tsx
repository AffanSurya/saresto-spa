import { Button } from "flowbite-react";
import { TableRadioComponent } from "../components/TableRadio";

export default function Order() {
  return (
    <div className="text-center">
      <h1 className="mb-2 text-4xl font-bold">Pesan Makanan</h1>

      <fieldset className="grid w-full gap-6 ">
        <legend className="mb-4 text-left">
          Pilih Nomor Meja yang Anda Tempati
        </legend>

        <div className="grid grid-cols-5 gap-4 p-4 md:grid-cols-10">
          {Array.from({ length: 20 }, (_, index) => (
            <TableRadioComponent
              key={index}
              id={`table-${index + 1}`}
              name="table_number"
              value={`${index + 1}`}
              labelText={`${index + 1}`}
            />
          ))}

          <div className="col-span-1 col-start-4 mt-5 md:col-start-9">
            <Button color="blue" className="w-32">
              Pilih Menu
            </Button>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
