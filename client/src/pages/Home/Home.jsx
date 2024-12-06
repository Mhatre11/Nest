import React from "react";
import HomeBanners from "../../components/HomeBanners/HomeBanners.jsx";
import CategoryIcons from "../../components/CategoriesIcons/CategoryIcons.jsx";
import DairyCarousel from "../../components/features/carousels/dairy.jsx";
import SnacksCarousel from "../../components/features/carousels/snacks.jsx";
import ColdDrinkCarousel from "../../components/features/carousels/cold-drinks.jsx";

const Home = () => {
  return (
    <div>
      <HomeBanners />
      <CategoryIcons />
      <DairyCarousel />
      <SnacksCarousel />
      <ColdDrinkCarousel />
    </div>
  );
};

export default Home;
