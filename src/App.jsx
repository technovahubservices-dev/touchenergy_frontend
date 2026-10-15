import { useEffect, useMemo, useState } from "react";
import { BrowserRouter,
  Route,
  Routes,
  useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import CartDrawer from "./components/layout/CartDrawer";
import Footer from "./components/layout/Footer";

import Hero from "./components/home/Hero";
import InverterShowcase from "./components/home/InverterShowcase";
import PowerFlow from "./components/home/PowerFlow";
import InverterRange from "./components/home/InverterRange";
import Technology from "./components/home/Technology";
import Support from "./components/home/Support";
import HeroAboutStack from "./components/home/HeroAboutStack";

import ProductDetails from "./components/pages/ProductDetails";
import Shop from "./components/pages/Shop";
import Checkout from "./components/pages/Checkout";
import BuyNowCheckout from "./components/pages/BuyNowCheckout";
import ContactUs from "./components/pages/ContactUs";
import CustomerInfo from "./components/pages/CustomerInfo";
import { Login, Register, Account } from "./components/pages/AuthPages";
import { AuthProvider } from "./context/AuthContext";
import products from "./data/products";
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearRemoteCart,
} from "./api/cart";
import { useAuth } from "./context/AuthContext";

const CART_STORAGE_KEY = "volterra-cart";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);

      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });

        return;
      }
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();

  const isContactPage = location.pathname === "/contact";

  const readGuestCart = () => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      return savedCart
        ? JSON.parse(savedCart).map((item) => ({
            ...item,
            image:
              products.find((product) => product.id === item.id)?.image ??
              item.image,
          }))
        : [];
    } catch {
      return [];
    }
  };

  const [cartItems, setCartItems] = useState(readGuestCart);
  const [cartOpen, setCartOpen] = useState(false);

  const mapRemoteCart = (cart) =>
    (cart?.items || []).map((item) => {
      const remoteProduct = item.product || {};
      const localProduct = products.find(
        (product) => product.id === remoteProduct.id
      );

      return {
        id: remoteProduct.id,
        mongoId: remoteProduct.mongoId,
        name: remoteProduct.name || localProduct?.name || "Product",
        category: localProduct?.category || "",
        price: remoteProduct.price ?? null,
        image: localProduct?.image || remoteProduct.image || "",
        quantity: item.quantity,
      };
    });

  // Load the signed-in user's MongoDB cart and merge any guest items.
  useEffect(() => {
    if (authLoading) return;

    let active = true;

    const syncCart = async () => {
      if (!user) {
        setCartItems(readGuestCart());
        return;
      }

      try {
        let remoteCart = await getCart();

        const guestItems = readGuestCart();

        for (const guestItem of guestItems) {
          const existing = remoteCart.items?.find(
            (item) => item.product?.id === guestItem.id
          );

          if (existing) {
            const mergedQuantity = Math.min(
              20,
              existing.quantity + guestItem.quantity
            );

            remoteCart = await updateCartItem(
              guestItem.id,
              mergedQuantity
            );
          } else {
            remoteCart = await addCartItem(
              guestItem.id,
              Math.min(20, guestItem.quantity)
            );
          }
        }

        if (!active) return;

        localStorage.removeItem(CART_STORAGE_KEY);
        setCartItems(mapRemoteCart(remoteCart));
      } catch (error) {
        console.error("Unable to sync cart:", error);
        if (active) {
          setCartItems(readGuestCart());
        }
      }
    };

    syncCart();

    return () => {
      active = false;
    };
  }, [user, authLoading]);

  // Persist only the guest cart locally.
  useEffect(() => {
    if (authLoading || user) return;

    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cartItems)
    );
  }, [cartItems, user, authLoading]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const applyRemoteCart = (remoteCart) => {
    setCartItems(mapRemoteCart(remoteCart));
  };

  const addToCart = async (product, openCart = true) => {
    try {
      if (user && !authLoading) {
        const remoteCart = await addCartItem(product.id, 1);
        applyRemoteCart(remoteCart);
      } else {
        setCartItems((current) => {
          const existing = current.find(
            (item) => item.id === product.id
          );

          if (existing) {
            return current.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }

          return [
            ...current,
            {
              id: product.id,
              name: product.name,
              category: product.category,
              price: product.price ?? null,
              image: product.image,
              quantity: 1,
            },
          ];
        });
      }

      if (openCart) setCartOpen(true);
    } catch (error) {
      console.error("Unable to add cart item:", error);
      window.alert(error.message || "Unable to add this product to your cart.");
    }
  };

  const increaseQuantity = async (productId) => {
    const item = cartItems.find((entry) => entry.id === productId);
    if (!item || item.quantity >= 20) return;

    try {
      if (user && !authLoading) {
        const remoteCart = await updateCartItem(
          productId,
          item.quantity + 1
        );
        applyRemoteCart(remoteCart);
      } else {
        setCartItems((current) =>
          current.map((entry) =>
            entry.id === productId
              ? { ...entry, quantity: entry.quantity + 1 }
              : entry
          )
        );
      }
    } catch (error) {
      console.error("Unable to increase cart quantity:", error);
      window.alert(error.message || "Unable to update your cart.");
    }
  };

  const decreaseQuantity = async (productId) => {
    const item = cartItems.find((entry) => entry.id === productId);
    if (!item) return;

    try {
      if (user && !authLoading) {
        if (item.quantity <= 1) {
          const remoteCart = await removeCartItem(productId);
          applyRemoteCart(remoteCart);
        } else {
          const remoteCart = await updateCartItem(
            productId,
            item.quantity - 1
          );
          applyRemoteCart(remoteCart);
        }
      } else {
        setCartItems((current) =>
          current
            .map((entry) =>
              entry.id === productId
                ? { ...entry, quantity: entry.quantity - 1 }
                : entry
            )
            .filter((entry) => entry.quantity > 0)
        );
      }
    } catch (error) {
      console.error("Unable to decrease cart quantity:", error);
      window.alert(error.message || "Unable to update your cart.");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (user && !authLoading) {
        const remoteCart = await removeCartItem(productId);
        applyRemoteCart(remoteCart);
      } else {
        setCartItems((current) =>
          current.filter((item) => item.id !== productId)
        );
      }
    } catch (error) {
      console.error("Unable to remove cart item:", error);
      window.alert(error.message || "Unable to remove this item.");
    }
  };

  const clearCart = async () => {
    try {
      if (user && !authLoading) {
        const remoteCart = await clearRemoteCart();
        applyRemoteCart(remoteCart);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Unable to clear cart:", error);
      window.alert(error.message || "Unable to clear your cart.");
    }
  };

  return (
    <>
      <ScrollToTop />

      {!isContactPage && (
        <Navbar
          cartCount={cartCount}
          onCartOpen={() => setCartOpen(true)}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <HeroAboutStack
                hero={<Hero />}
                about={<InverterShowcase />}
              />

              <PowerFlow />

              <InverterRange
                onAddToCart={addToCart}
                cartItems={cartItems}
              />

              <Technology />
              <Support />
            </main>
          }
        />

        <Route path="/contact" element={<ContactUs />} />
        <Route path="/customer-info" element={<CustomerInfo />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />

        <Route
          path="/buy-now/:productId"
          element={
            authLoading ? (
              <main className="auth-page">
                <p>Loading account...</p>
              </main>
            ) : user ? (
              <BuyNowCheckout />
            ) : (
              <Navigate
                to="/login"
                state={{
                  from: `/buy-now/${window.location.pathname.split("/").pop()}${window.location.search}`,
                }}
                replace
              />
            )
          }
        />
        <Route
          path="/checkout"
          element={
            authLoading ? (
              <main className="auth-page"><p>Loading account...</p></main>
            ) : user ? (
              <Checkout
                cartItems={cartItems}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onClear={clearCart}
              />
            ) : (
              <Navigate
                to="/login"
                state={{ from: "/checkout" }}
                replace
              />
            )
          }
        />

        <Route
          path="/shop"
          element={
            <Shop
              onAddToCart={addToCart}
              cartItems={cartItems}
            />
          }
        />

        <Route
          path="/products/:productId"
          element={<ProductDetails onAddToCart={addToCart} />}
        />
      </Routes>

      {!isContactPage && <Footer />}

      {!isContactPage && (
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cartItems={cartItems}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
      )}
    </>
  );
}
function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;








