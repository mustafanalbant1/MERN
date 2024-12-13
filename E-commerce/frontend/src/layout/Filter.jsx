const Filter = ({ setRating, setPrice, setCategory }) => {
  const categoryList = [
    "Çanta",
    "Ayakkabı",
    "Bilgisayar",
    "Telefon",
    "Pantalon",
  ];

  const ratingList = [1, 2, 3, 4, 5];

  return (
    <div className="w-[200px] mt-3 p-1">
      <div className="text-lg cursor-pointer">Filtreleme</div>
      <div className="flex items-center gap-2 my-2">
        <input
          onChange={(e) =>
            setPrice((prev) => ({ ...prev, min: e.target.value }))
          }
          className="border w-16 p-1 outline-none "
          type="number"
          placeholder="Min"
        />
        <input
          onChange={(e) =>
            setPrice((prev) => ({ ...prev, max: e.target.value }))
          }
          className="border w-16 p-1 outline-none "
          type="number"
          placeholder="Max"
        />
      </div>
      <div className="text-lg cursor-pointer">Kategori</div>
      {categoryList.map((category, i) => (
        <div
          onClick={() => setCategory(category)}
          className="text-sm cursor-pointer"
          key={i}
        >
          {category}
        </div>
      ))}
      <hr />
      <div className="text-lg cursor-pointer">Rating</div>
      {ratingList.map((rating, i) => (
        <div
          onClick={() => setRating(rating)}
          className="text-sm cursor-pointer"
          key={i}
        >
          {rating}
        </div>
      ))}
    </div>
  );
};

export default Filter;
