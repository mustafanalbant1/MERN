import { useSelector } from "react-redux";
import BasketCard from "../components/BasketCard";

const Cart = () => {
  const { carts } = useSelector((state) => state.cart);

  const totalPrice = () => {
    return carts.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="fixed top-0 right-0 h-screen w-1/5 bg-white shadow-lg">
      <div>
        <BasketCard />
      </div>
      <div className="flex justify-between ml-5 mr-5 mt-4">
        <div className="font-semibold">Toplam:</div>
        <div className="text-black font-semibold">
          ${totalPrice().toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Cart;
