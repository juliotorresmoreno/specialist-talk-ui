import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Landing } from "../pages/Landing";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

const NotFoundPage = () => {
  return (
    <div>
      <NavBar />
      <h1>Not Found</h1>
      <Footer />
    </div>
  );
};

export function Router() {
  const session = useSelector((state: RootState) => state.auth.session);
  return (
    <Routes>
      {!session ? (
        <>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFoundPage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  );
}
