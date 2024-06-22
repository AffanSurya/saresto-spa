import React from "react";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";

function ContactInfoComponent() {
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-around">
      <div className="mb-4 text-center md:mb-0">
        <HiOutlineLocationMarker className="mx-auto mb-2 size-8 text-blue-500" />
        <h3 className="text-2xl font-semibold">Lokasi</h3>
        <p>Jl. Jalan No. 123, Madiun</p>
      </div>
      <div className="mb-4 text-center md:mb-0">
        <HiOutlinePhone className="mx-auto mb-2 size-8 text-blue-500" />
        <h3 className="text-2xl font-semibold">Telepon</h3>
        <p>(021) 123-4567</p>
      </div>
      <div className="text-center">
        <HiOutlineMail className="mx-auto mb-2 size-8 text-blue-500" />
        <h3 className="text-2xl font-semibold">Email</h3>
        <p>info@saresto.com</p>
      </div>
    </div>
  );
}

export default ContactInfoComponent;
