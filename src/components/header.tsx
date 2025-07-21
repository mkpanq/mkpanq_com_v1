const Header = () => {
  return (
    <div className="flex justify-between font-medium text-black/50 text-3xl">
      <a href="/" className="font-semibold hover:text-black">
        mkpanq.com
      </a>
      <div className="flex space-x-10">
        <a href="/about" className="hover:text-black">
          about
        </a>
        <a href="/contact" className="hover:text-black">
          contact
        </a>
      </div>
    </div>
  );
};

export default Header;
