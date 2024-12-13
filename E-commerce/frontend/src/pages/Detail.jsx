import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsDetail } from "../redux/productSlice";
import Slider from "react-slick";
import Button from "../components/Button";
import ReactStars from "react-rating-stars-component";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getProductsDetail(id));
    }
  }, [dispatch, id]);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const addBasket = () => {};
  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const increment = () => {
    if (quantity < product?.product?.stock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <div className="flex mt-4 justify-center gap-5">
            {product?.product && (
              <div className="w-[500px]">
                <Slider {...sliderSettings}>
                  {product?.product?.images?.map((image, i) => (
                    <img src={image.url} key={i} />
                  ))}
                </Slider>
              </div>
            )}
            <div className="space-y-3">
              <div className="text-3xl">{product?.product?.name}</div>
              <div className="text-xl">{product?.product?.description}</div>
              {product?.product?.stock > 0 ? (
                <div className="text-xl">Stok:{product?.product?.stock}</div>
              ) : (
                <div>Ürün Stokta Kalmamıştır</div>
              )}
              <div className="text-xl">
                Katagori:{product?.product?.category}
              </div>
              <div className="text-xl flex flex-row text-black">
                Rating:{product?.product?.rating}
                <ReactStars
                  count={5}
                  value={product?.product?.rating}
                  size={24}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </div>
              <div className="flex items-center gap-4">
                <div onClick={decrement} className="text-3xl cursor-pointer ">
                  -
                </div>
                <div className="text-2xl">{quantity}</div>
                <div onClick={increment} className="text-3xl cursor-pointer">
                  +
                </div>
              </div>
              <Button name={"Sepete Ekle"} onClick={addBasket} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
