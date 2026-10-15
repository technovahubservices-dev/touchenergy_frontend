import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-brand">
          TOUCH ENERGY
        </Link>
        <p className="auth-eyebrow">CUSTOMER ACCOUNT</p>
        <h1>{title}</h1>
        <p className="auth-subtitle">{subtitle}</p>
        {children}
      </section>
    </main>
  );
}

function AuthMessage({ message, error }) {
  if (!message) return null;

  return (
    <p className={`auth-message ${error ? "is-error" : "is-success"}`}>
      {message}
    </p>
  );
}

export function Login() {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  if (loading) {
    return <main className="auth-page"><p>Loading account...</p></main>;
  }

  if (isAuthenticated) return <Navigate to={location.state?.from || "/account"} replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setBusy(true);

    try {
      await login({ email, password });
      navigate(location.state?.from || "/account", { replace: true });
    } catch (error) {
      setMessage(error.message || "Unable to log in.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your Touch Energy account."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email address</label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <AuthMessage message={message} error />

        <button className="auth-submit" type="submit" disabled={busy}>
          {busy ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="auth-switch">
        Don't have an account? <Link to="/register" state={location.state}>Create one</Link>
      </p>
    </AuthLayout>
  );
}

export function Register() {
  const { register, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  if (loading) {
    return <main className="auth-page"><p>Loading account...</p></main>;
  }

  if (isAuthenticated) return <Navigate to={location.state?.from || "/account"} replace />;

  const update = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setBusy(true);

    try {
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      navigate(location.state?.from || "/account", { replace: true });
    } catch (error) {
      setMessage(error.message || "Unable to create your account.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register to manage your Touch Energy customer details."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="register-name">Full name</label>
        <input
          id="register-name"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={update}
          minLength={2}
          maxLength={100}
          required
        />

        <label htmlFor="register-email">Email address</label>
        <input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={update}
          required
        />

        <label htmlFor="register-phone">Phone number (optional)</label>
        <input
          id="register-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={update}
          maxLength={30}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={update}
          minLength={8}
          maxLength={128}
          required
        />

        <label htmlFor="register-confirm-password">Confirm password</label>
        <input
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={update}
          minLength={8}
          maxLength={128}
          required
        />

        <AuthMessage message={message} error />

        <button className="auth-submit" type="submit" disabled={busy}>
          {busy ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="auth-switch">
        Already registered? <Link to="/login" state={location.state}>Sign in</Link>
      </p>
    </AuthLayout>
  );
}

export function Account() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
    if (loading || !user) return;

    const fetchOrders = async () => {
      setOrdersLoading(true);
      setOrdersError("");

      try {
        const token = localStorage.getItem("touch-energy-token");
        const API_BASE_URL =
          import.meta.env.VITE_API_URL || "http://localhost:5000/api";

        const response = await fetch(`${API_BASE_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Unable to load your orders.");
        }

        setOrders(data.orders || []);
      } catch (error) {
        setOrdersError(error.message || "Unable to load your orders.");
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [loading, user]);

  if (loading) {
    return (
      <main className="auth-page">
        <p>Loading account...</p>
      </main>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="auth-page">
      <section className="auth-card account-card">
        <p className="auth-eyebrow">CUSTOMER ACCOUNT</p>
        <h1>My Account</h1>
        <p className="auth-subtitle">
          Your Touch Energy customer profile.
        </p>

        <div className="account-details">
          <div>
            <span>Full name</span>
            <strong>{user.name}</strong>
          </div>
          <div>
            <span>Email address</span>
            <strong>{user.email}</strong>
          </div>
          <div>
            <span>Phone number</span>
            <strong>{user.phone || "Not provided"}</strong>
          </div>
        </div>

        <div className="account-orders">
          <h2>My Orders</h2>

          {ordersLoading ? (
            <p className="account-note">Loading your orders...</p>
          ) : ordersError ? (
            <p className="account-note">{ordersError}</p>
          ) : orders.length === 0 ? (
            <p className="account-note">
              You haven't placed any orders yet. Orders submitted while
              signed in will appear here.
            </p>
          ) : (
            <div className="account-order-list">
              {orders.map((order) => {
                const isPaid = order.paymentStatus === "PAID";
                const isFailed = order.paymentStatus === "FAILED";
                const isPaymentPending =
                  order.paymentStatus === "PENDING" &&
                  order.orderStatus === "PAYMENT_PENDING";

                const statusLabel = isPaid
                  ? "Order Placed"
                  : isFailed
                    ? "Payment Failed"
                    : isPaymentPending
                      ? "Payment Pending"
                      : order.requestType === "QUOTE_REQUESTED"
                        ? "Quote Requested"
                        : "Order Pending";

                const dateLabel = isPaid
                  ? "Placed on"
                  : isFailed
                    ? "Payment attempt on"
                    : isPaymentPending
                      ? "Started on"
                      : "Created on";

                return (
                  <article className="account-order" key={order._id}>
                    <div className="account-order-header">
                      <div>
                        <span>Order ID</span>
                        <strong>{order._id}</strong>
                      </div>
                      <span className="account-order-status">
                        {statusLabel}
                      </span>
                    </div>

                    <p className="account-order-date">
                      {dateLabel} {formatDate(order.createdAt)}
                    </p>

                  <div className="account-order-items">
                    {(order.items || []).map((item, index) => (
                      <div
                        className="account-order-item"
                        key={item._id || item.product || index}
                      >
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <strong>
                          {typeof item.unitPrice === "number"
                            ? `₹${(
                                item.unitPrice * item.quantity
                              ).toLocaleString("en-IN")}`
                            : "Price on Request"}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <div className="account-order-total">
                    <span>Total</span>
                    <strong>
                      {typeof order.total === "number"
                        ? `₹${order.total.toLocaleString("en-IN")}`
                        : "Price on Request"}
                    </strong>
                  </div>
                </article>
                );
              })}
            </div>
          )}
        </div>

        <div className="account-actions">
          <Link className="auth-submit auth-secondary" to="/shop">
            Browse Products
          </Link>
          <button
            className="auth-submit"
            type="button"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      </section>
    </main>
  );
}


