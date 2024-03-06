import { Link, useNavigate } from "react-router-dom";
import { Input } from "./Input";
import authSlice from "../features/authSlice";
import { useDispatch } from "react-redux";

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    dispatch(authSlice.actions.logout());
    navigate("/");
  };
  return (
    <header className="bg-purple-500">
      <div className="flex flex-1">
        <div className="flex w-auto lg:w-[300px] px-4 my-3 h-10 items-center gap-4">
          <Link to="/" className="font-bold text-white ">
            Home
          </Link>
        </div>
        <div className="flex-1 px-4 my-3 h-10 hidden md:block">
          <Input className="h-10 min-w-[400px]" />
        </div>
        <div className="flex flex-1 px-6 my-3 h-10 items-center justify-end gap-4">
          <Link to="/profile" className="font-bold text-white ">
            Profile
          </Link>
          <a
            href="javascipt: void(0)"
            className="font-bold text-white "
            onClick={handleLogout}
          >
            Logout
          </a>
        </div>
      </div>
    </header>
  );
}
