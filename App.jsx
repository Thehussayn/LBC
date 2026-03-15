import { useState } from "react";
import { G } from "./styles/global.js";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BusinessDetailPage from "./pages/BusinessDetailPage";
import AuthPage from "./pages/AuthPage";
import OnboardingPage from "./pages/OnboardingPage";
import CartPage from "./pages/CartPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [searchQ, setSearchQ] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProduct, _setSelectedProduct] = useState(null);
  const [selectedBusiness, _setSelectedBusiness] = useState(null);

  const toggleWish = (id) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  const setSelectedProduct = (p) => {
    _setSelectedProduct(p);
    setPage("product");
  };
  const setSelectedBusiness = (b) => {
    _setSelectedBusiness(b);
    setPage("business");
  };

  const showCatBar = ["home", "search"].includes(page);

  return (
    <>
      <style>{G}</style>
      <Navbar
        page={page}
        setPage={setPage}
        searchQ={searchQ}
        setSearchQ={setSearchQ}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        cart={cart}
        user={user}
        setUser={setUser}
      />
      {showCatBar && (
        <CategoryBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          setPage={setPage}
        />
      )}

      {page === "home" && (
        <HomePage
          setPage={setPage}
          searchQ={searchQ}
          setSearchQ={setSearchQ}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          wishlist={wishlist}
          toggleWish={toggleWish}
          setSelectedProduct={setSelectedProduct}
          setSelectedBusiness={setSelectedBusiness}
          cart={cart}
          setCart={setCart}
        />
      )}
      {page === "search" && (
        <SearchPage
          searchQ={searchQ}
          activeCategory={activeCategory}
          setSelectedProduct={setSelectedProduct}
          setSelectedBusiness={setSelectedBusiness}
          wishlist={wishlist}
          toggleWish={toggleWish}
        />
      )}
      {page === "product" && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          setPage={setPage}
          wishlist={wishlist}
          toggleWish={toggleWish}
          cart={cart}
          setCart={setCart}
        />
      )}
      {page === "business" && selectedBusiness && (
        <BusinessDetailPage
          business={selectedBusiness}
          setPage={setPage}
          setSelectedProduct={setSelectedProduct}
          wishlist={wishlist}
          toggleWish={toggleWish}
        />
      )}
      {page === "signin" && <AuthPage setPage={setPage} setUser={setUser} />}
      {page === "onboarding" && (
        <OnboardingPage setPage={setPage} user={user} />
      )}
      {page === "cart" && (
        <CartPage cart={cart} setCart={setCart} setPage={setPage} />
      )}
      {page === "dashboard" && (
        <DashboardPage user={user} setPage={setPage} />
      )}
    </>
  );
}
