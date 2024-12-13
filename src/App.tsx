import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import { useGetUserQuery } from "./store/users/user";

const Products = lazy(() => import("./pages/products"));
const Auth = lazy(() => import("./pages/auth-page"));

const App = () => {
  const { data: user, isLoading } = useGetUserQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <Router>
      <Suspense>
        <Routes>
          <Route
            path="/products"
            element={user ? <Products /> : <Navigate to="/" />}
          />
          <Route
            path="*"
            element={user ? <Navigate to="/products" /> : <Auth />}
          />
        </Routes>
        <Toaster />
      </Suspense>
    </Router>
  );
};

export default App;
