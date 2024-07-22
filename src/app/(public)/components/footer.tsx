const Footer = () => {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="w-full bg-primary text-primary-foreground px-6 py-16"
    >
      <div className="max-w-screen-xl mx-auto  px-2">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="space-y-8">
            <div>MRKT</div>
            <p className="text-md max-w-xs leading-6">
              An Open-Source Marketplace.
            </p>
          </div>
        </div>
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
