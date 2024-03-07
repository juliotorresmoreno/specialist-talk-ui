import { useSelector } from "react-redux";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function NotFound() {
  const session = useSelector((state: RootState) => state.auth.session);
  const navigate = useNavigate();
  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <div className="mx-auto">
      <NavBar />
      <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
        <div className="border-t border-gray-200 text-center pt-8">
          <h1 className="text-9xl font-bold text-green-400">404</h1>
          <h1 className="text-6xl font-medium py-8">oops! Page not found</h1>
          <p className="text-2xl pb-8 px-12 font-medium">
            Oops! The page you are looking for does not exist. It might have
            been moved or deleted.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
