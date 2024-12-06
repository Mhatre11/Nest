import React, { useState } from "react";
import "./CategoryPage.css";
import { BsChevronRight } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import Dairy_Breakfast from "../../components/ProductPages/Dairy_Breakfast";
import Vegetables from "../../components/ProductPages/Vegetables";
import ColdDrinks from "../../components/ProductPages/ColdDrinks";
import Snacks from "../../components/ProductPages/Snacks";
import TeaCoffee_HealthDrinks from "../../components/ProductPages/TeaCoffee_HealthDrinks";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import { Categories } from "../../data/categoryIcons";

const CategoryPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Category Navigation */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-8 py-4 overflow-x-auto scrollbar-hide">
              {Categories.map((category) => (
                <Link
                  key={category.id}
                  to={category.path}
                  className={`flex flex-col items-center space-y-2 group flex-shrink-0 ${
                    currentPath === category.path
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg overflow-hidden ${
                    currentPath === category.path
                      ? "ring-2 ring-blue-600"
                      : "group-hover:ring-2 group-hover:ring-blue-400"
                  }`}>
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium whitespace-nowrap">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <BsChevronRight className="text-gray-400 mx-2" />
                  <span className="text-gray-500 text-sm font-medium">Categories</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {currentPath === "/category" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Categories.map((category) => (
                <Link
                  key={category.id}
                  to={category.path}
                  className="block group"
                >
                  <div className="relative rounded-lg overflow-hidden bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                    <div className="aspect-w-1 aspect-h-1">
                      <img
                        src={category.icon}
                        alt={category.name}
                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 text-center">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              {currentPath === "/category/vegetables-fruits" && <Vegetables />}
              {currentPath === "/category/dairy-breakfast" && <Dairy_Breakfast />}
              {currentPath === "/category/beverages" && <ColdDrinks />}
              {currentPath === "/category/snacks-munchies" && <Snacks />}
              {currentPath === "/category/tea-coffee" && <TeaCoffee_HealthDrinks />}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CategoryPage;
