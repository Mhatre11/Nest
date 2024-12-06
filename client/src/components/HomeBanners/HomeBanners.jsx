import React from "react";

const HomeBanners = () => {
  return (
    <>
      <div className="container mx-auto w-[85%] mt-3">
        <img
          src="src/assets/HomeBanners/PaanCorner.webp"
          alt="Paan Corner banner"
          className="w-full"
        />
      </div>
      <div className="container mx-32 mt-3  flex gap-5 w-1/4">
        <img
          src="src/assets/HomeBanners/Pharmacy.avif"
          className="h-52"
          alt="Pharmacy banner"
        />
        <img
          src="./src/assets/HomeBanners/Pet-Care_WEB.avif"
          className="h-52"
          alt="Pet Care banner"
        />
        <img
          src="./src/assets/HomeBanners/babyCare-WEB.avif"
          className="h-52"
          alt="Baby Care banner"
        />
      </div>
    </>
  );
};

export default HomeBanners;
