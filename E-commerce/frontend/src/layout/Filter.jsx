import React, { useState } from "react";

const Filter = ({ setRating, setPrice, setCategory }) => {
  const categoryList = [
    "Çanta",
    "Ayakkabı",
    "Bilgisayar",
    "Telefon",
    "Pantalon",
  ];

  const ratingList = [1, 2, 3, 4, 5];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);

  const resetFilters = () => {
    setPrice({ min: 0, max: 30000 });
    setCategory("");
    setRating(0);
    setSelectedCategory("");
    setSelectedRating(null);
  };

  return (
    <div className="w-[200px] mt-3 p-1">
      <div className="text-lg cursor-pointer font-semibold mb-2">
        Filtreleme
      </div>

      {/* Fiyat Aralığı */}
      <div className="flex items-center gap-2 my-2">
        <input
          onChange={(e) =>
            setPrice((prev) => ({ ...prev, min: e.target.value }))
          }
          className="border w-16 p-1 outline-none"
          type="number"
          placeholder="Min"
        />
        <input
          onChange={(e) =>
            setPrice((prev) => ({ ...prev, max: e.target.value }))
          }
          className="border w-16 p-1 outline-none"
          type="number"
          placeholder="Max"
        />
      </div>

      {/* Kategori */}
      <div className="text-lg cursor-pointer font-semibold mt-4">Kategori</div>
      {categoryList.map((category, i) => (
        <div
          onClick={() => {
            setCategory(category);
            setSelectedCategory(category);
          }}
          className={`text-sm cursor-pointer p-1 rounded-md my-1 ${
            selectedCategory === category ? "bg-blue-500 text-white" : ""
          }`}
          key={i}
        >
          {category}
        </div>
      ))}

      <hr className="my-3" />

      {/* Rating */}
      <div className="text-lg cursor-pointer font-semibold mt-4">Rating</div>
      {ratingList.map((rating, i) => (
        <div
          onClick={() => {
            setRating(rating);
            setSelectedRating(rating);
          }}
          className={`text-sm cursor-pointer p-1 rounded-md my-1 ${
            selectedRating === rating ? "bg-blue-500 text-white" : ""
          }`}
          key={i}
        >
          {rating} Yıldız
        </div>
      ))}

      {/* Filtreleri Sıfırla Butonu */}
      <button
        onClick={resetFilters}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
      >
        Filtreleri Sıfırla
      </button>
    </div>
  );
};

export default Filter;
