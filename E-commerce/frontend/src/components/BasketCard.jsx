import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const BasketCard = () => {
  const { carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="relative p-4">
      {/* Sağ üst köşede çarpı */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
      >
        ×
      </button>

      {carts?.length > 0 ? (
        carts.map((cart, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 border-b"
          >
            <img
              src={cart.image}
              alt={cart.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 mx-4">
              <h3 className="text-lg font-medium">{cart.name}</h3>
              <h3 className="text-sm font-medium text-gray-500">
                Adet: {cart.quantity}
              </h3>
              <p className="text-sm text-gray-500">Price: ${cart.price}</p>
            </div>

            <button
              className="ml-4 text-red-500 hover:text-red-700"
              onClick={() => onRemove(cart.id)}
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Your cart is empty!</p>
      )}
    </div>
  );
};

export default BasketCard;
