import { Provider } from "react-redux";
import { store } from "../store";
import "../styles/globals.css";
import Header from "../components/Header ";
import Footer from "../components/Footer";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}
