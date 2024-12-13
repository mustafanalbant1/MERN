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

  console.log("Products:", products);

  const itemsPerPage = 3;
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = products?.products?.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(products?.products?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
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
    <div className="min-h-screen">
      <div className="flex gap-3">
        <Filter
          setPrice={setPrice}
          setRating={setRating}
          setCategory={setCategory}
        />
        <div>
          {loading ? (
            "Loading..."
          ) : (
            <div className="flex items-center justify-center gap-5 my-5 p flex-wrap">
              {currentItems?.length > 0
                ? currentItems.map((product, i) => (
                    <ProductCard key={i} product={product} />
                  ))
                : "No products found"}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-5">
        {/* Pagination Controls */}
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default Products;
