import { footer_links } from "@/constant/footer-links";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="w-full bg-primary text-primary-foreground px-6 py-16"
    >
      <div className="max-w-screen-xl mx-auto  px-2">
        {/* Top */}
        <div className="flex flex-col justify-between lg:flex-row">
          {/* Left */}
          <div className="space-y-8">
            <div>MRKT</div>
            <p className="text-md max-w-xs leading-6">
              Discover a world of amazing products on MRKT. From tech gadgets to
              vintage finds, our platform makes it easy to buy and sell with
              confidence.
            </p>
          </div>
          {/* Right */}
          <div className="mt-16 grid grid-cols-2 gap-14 md:grid-cols-2 lg:mt-0 xl:col-span-2">
            <div className="md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-white ">
                About Us
              </h3>
              <div className="mt-6 space-y-4">
                {footer_links.connect.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      rel="noreferrer"
                      className="text-sm leading-6 text-neutral-500 hover:text-white ease-in duration-200"
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t sm:mt-20 lg:mt-24 pt-16">
          <p className="text-xs leading-5">
            &copy; 2024 MRKT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
