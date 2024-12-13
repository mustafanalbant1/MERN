import Slider from "react-slick";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Görselleri filtrele
  const images = product?.images?.filter((image) => image?.url);

  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="w-[300px] h-[480px] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
    >
      {/* Slider Bölümü */}
      <div className="w-full h-[300px] bg-gray-200 m-5 mb-2">
        {images?.length > 0 ? (
          <Slider {...sliderSettings}>
            {images.map((image, i) => (
              <div key={`${product?.id}-${i}`} className="w-full h-[300px]">
                <img
                  src={image.url}
                  alt={product?.name || `product-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="h-[250px] bg-gray-300 flex items-center justify-center text-sm text-gray-600">
            No Image
          </div>
        )}
      </div>
      <div>
        <div className="flex-1 p-4 flex flex-row items-center justify-between ">
          <div>
            <div className="text-lg font-semibold text-gray-800 truncate">
              {product?.name}
            </div>
            <div className="text-sm font-normal text-gray-600 mt-1">
              {product?.description || "No description available"}
            </div>
          </div>
          <div className="text-lg font-semibold text-gray-900 mt-3">
            {product?.price} $
          </div>
        </div>
        <div className="p-3 flex items-center justify-between">
          <button className="text-gray-600 flex items-center space-x-1 ">
            <FaHeart size={20} />
          </button>
          <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
