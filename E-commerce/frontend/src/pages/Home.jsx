import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import image1 from "../assets/image/discount.jpg";
import image2 from "../assets/image/purple-shop.jpg";
import image3 from "../assets/image/shopping.png";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const carouselImages = [image1, image2, image3];

  useEffect(() => {
    dispatch(
      getProducts({ keyword: "", rating: 0, price: { min: 0, max: 30000 } })
    );
  }, [dispatch]);

  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
  };

  const items = carouselImages.map((image, index) => (
    <div key={index} className="relative w-full h-[500px]">
      <img
        src={image}
        alt={`Carousel Image ${index + 1}`}
        className="w-full h-full object-cover"
      />
    </div>
  ));

  return (
    <>
      {/* Carousel Alanı */}
      <div className="w-full" style={{ height: "500px" }}>
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          autoPlay={true}
          autoPlayInterval={3000}
          infinite={true}
          disableButtonsControls={true}
        />
      </div>

      {/* Ürünler Bölümü */}
      {loading ? (
        <div className="flex items-center justify-center h-screen text-white">
          Loading...
        </div>
      ) : (
        <div className="flex items-center justify-center gap-5 my-10 flex-wrap px-5">
          {products?.products?.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
