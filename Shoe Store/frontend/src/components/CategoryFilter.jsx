import React from "react";
import { useSelector } from "react-redux";

const CategoryFilter = ({ onFilterChange }) => {
  const { products } = useSelector((state) => state.products);

  // Benzersiz kategorileri al
  const categories = {
    types: [
      "Spor Ayakkabı",
      "Günlük Ayakkabı",
      "Koşu Ayakkabısı",
      "Basketbol Ayakkabısı",
    ],
    brands: [...new Set(products?.map((p) => p.brand) || [])],
    sizes: [...new Set(products?.map((p) => String(p.size)) || [])].sort(
      (a, b) => a - b
    ),
    colors: [...new Set(products?.map((p) => p.color) || [])],
    priceRanges: [
      { label: "0 - 1000 ₺", value: "0-1000" },
      { label: "1000 - 2000 ₺", value: "1000-2000" },
      { label: "2000 - 3000 ₺", value: "2000-3000" },
      { label: "3000 ₺ ve üzeri", value: "3000" },
    ],
  };

  const handleCategoryClick = (category, value) => {
    onFilterChange(category, value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-6">
      {/* Ayakkabı Tipleri */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Kategoriler</h3>
        <div className="flex flex-wrap gap-2">
          {categories.types.map((type) => (
            <button
              key={type}
              onClick={() => handleCategoryClick("type", type)}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-orange-100 rounded-full transition-colors duration-200"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Markalar */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Markalar</h3>
        <div className="flex flex-wrap gap-2">
          {categories.brands.map((brand) => (
            <button
              key={brand}
              onClick={() => handleCategoryClick("brand", brand)}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-orange-100 rounded-full transition-colors duration-200"
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Numaralar */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Numaralar</h3>
        <div className="grid grid-cols-4 gap-2">
          {categories.sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleCategoryClick("size", size)}
              className="px-3 py-2 text-sm bg-gray-100 hover:bg-orange-100 rounded-lg transition-colors duration-200"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Renkler */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Renkler</h3>
        <div className="flex flex-wrap gap-2">
          {categories.colors.map((color) => (
            <button
              key={color}
              onClick={() => handleCategoryClick("color", color)}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-orange-100 rounded-full transition-colors duration-200"
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Fiyat Aralıkları */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Fiyat Aralığı</h3>
        <div className="flex flex-col gap-2">
          {categories.priceRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => handleCategoryClick("priceRange", range.value)}
              className="px-4 py-2 text-sm text-left bg-gray-100 hover:bg-orange-100 rounded-lg transition-colors duration-200"
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
