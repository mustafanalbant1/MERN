import Filter from "../layout/Filter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import ReactPaginate from "react-paginate";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { keyword } = useSelector((state) => state.general);
  const [price, setPrice] = useState({ min: 0, max: 30000 });
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 3;
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = products?.products?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products?.products?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(
      getProducts({
        keyword: keyword || "",
        price: price || { min: 0, max: 30000 },
        rating: rating || 0,
        category: category || "",
      })
    );
  }, [dispatch, keyword, price, rating, category]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-col lg:flex-row gap-6 p-5 flex-1">
        {/* Sol Sidebar: Filtre */}
        <div className="bg-white p-5 rounded-lg shadow-lg w-full lg:w-1/4">
          <Filter
            setPrice={setPrice}
            setRating={setRating}
            setCategory={setCategory}
          />
        </div>

        {/* Sağ Taraf: Ürünler */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <p className="text-gray-500 text-lg font-medium">Loading...</p>
            </div>
          ) : (
            <div>
              {/* Ürün Kartları */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems?.length > 0 ? (
                  currentItems.map((product, i) => (
                    <ProductCard key={i} product={product} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-600 font-medium">
                    No products found
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sayfalama Kontrolleri */}
      <div className="mt-auto flex justify-center py-5 bg-gray-50">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< Previous"
          containerClassName="flex items-center space-x-1"
          pageClassName="px-3 py-1 rounded-lg bg-white text-gray-600 hover:bg-blue-100 cursor-pointer"
          previousClassName="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
          nextClassName="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
          activeClassName="bg-blue-500 text-white font-bold"
        />
      </div>
    </div>
  );
};

export default Products;
