import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import { Link } from "react-router-dom";

export default function FooterComponent() {
  return (
    <Footer container>
      <div className="w-full text-center ">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterBrand
            href="https://flowbite.com"
            src="./logo-saresto.png"
            alt="Sa Resto Logo"
            name="Sa Resto"
          />
          <FooterLinkGroup>
            <FooterLink href="">
              <Link to="/pesan">Pesan</Link>
            </FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href="#" by="Lfa™" year={2024} />
      </div>
    </Footer>
  );
}
