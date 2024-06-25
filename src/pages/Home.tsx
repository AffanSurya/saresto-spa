import { Button } from "flowbite-react";
import CarouselComponent from "../components/Carousel";
import ContactInfoComponent from "../components/ContactInfo";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center">
      <h1 className="mb-2 text-4xl font-bold">Selamat Datang di Sa Resto</h1>
      <p className="mb-4 text-white">Pesan Makanan dengan Mudah di Sa Resto</p>
      <CarouselComponent />

      <section className="my-8">
        <h2 className="mb-4 text-3xl font-semibold">Tentang Kami</h2>
        <p className="text-white">
          Sa Resto adalah restoran terbaik dengan berbagai pilihan makanan lezat
          dan pelayanan terbaik. Kami berdedikasi untuk memberikan pengalaman
          kuliner terbaik bagi Anda.
        </p>
      </section>

      <section className="my-8">
        <h2 className="mb-4 text-3xl font-semibold">Menu Unggulan</h2>
        {/* <FeaturedMenu /> */}
      </section>

      <section className="my-8">
        <h2 className="mb-4 text-3xl font-semibold">Promosi dan Diskon</h2>
        <p className="text-white">
          Jangan lewatkan promosi spesial kami! Diskon 20% untuk semua menu
          setiap hari Jumat.
        </p>
      </section>

      <section className="my-8">
        <h2 className="mb-4 text-3xl font-semibold">Kontak dan Lokasi</h2>
        <ContactInfoComponent />
      </section>

      <section className="my-8">
        <h2 className="mb-4 text-3xl font-semibold">Jam Operasional</h2>
        <p className="text-white">
          Buka setiap hari dari pukul 10:00 hingga 22:00
        </p>
      </section>

      <div className="flex flex-wrap justify-center gap-2">
        <Button color="blue">
          <Link to="/pesan">Pesan Sekarang</Link>
          <HiOutlineArrowRight className="ml-2 size-5" />
        </Button>
      </div>
    </div>
  );
}

export default Home;
