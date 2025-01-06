import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

const Admin = () => {
  const dispatch = useDispatch();
  const { adminProducts } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);

  console.log(adminProducts, "admin");
  return (
    <div className="min-h-screen">
      {adminProducts?.products?.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </div>
  );
};

export default Admin;
