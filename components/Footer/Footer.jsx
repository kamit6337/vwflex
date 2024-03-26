const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="h-full flex flex-col justify-end items-center gap-10 pb-3 relative">
      <div className="text-center">
        <p className="uppercase text-2xl font-semibold tracking-wide">vwflex</p>
        <p className="text-sm mt-1">
          an On-Demand, Online Movies and TV Shows streaming platform
        </p>
      </div>
      <p className="text-sm text-gray-400">
        Copyright of Amit Kumar, &copy; {year}
      </p>
    </div>
  );
};

export default Footer;
