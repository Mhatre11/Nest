import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { snacksMunchies } from "../../../data/products/snacksMunchies";
import Card from "../../Card/ProductCard.jsx";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { GiPopcorn } from "react-icons/gi";
import { BsChevronRight } from "react-icons/bs";

const SnacksCarousel = () => {
  const NextArrow = ({ onClick }) => {
    return (
      <div
        className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 cursor-pointer hidden md:block"
        onClick={onClick}
      >
        <div className="w-12 h-12 bg-white/80 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300">
          <MdNavigateNext className="text-3xl text-gray-800" />
        </div>
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div
        className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 cursor-pointer hidden md:block"
        onClick={onClick}
      >
        <div className="w-12 h-12 bg-white/80 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300">
          <MdNavigateBefore className="text-3xl text-gray-800" />
        </div>
      </div>
    );
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="py-12 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GiPopcorn className="text-2xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Snacks & Munchies</h2>
            </div>
            <div className="absolute -bottom-2 left-0 w-24 h-1 bg-blue-600 rounded-full"></div>
          </div>
          <Link
            to="/category/snacks-munchies"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            View All <BsChevronRight />
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="px-1">
            <Slider {...settings} className="slick-carousel">
              {snacksMunchies.map((item) => (
                <div key={item.id} className="px-3">
                  <Card
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    quantity={item.quantity}
                    price={item.price}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SnacksCarousel;
