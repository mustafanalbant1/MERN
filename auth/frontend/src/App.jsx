import { Provider } from "react-redux";
import { store } from "./store/store";
import Auth from "./pages/Auth";

function App() {
  return (
    <Provider store={store}>
      <Auth />
    </Provider>
  );
}

export default App;
