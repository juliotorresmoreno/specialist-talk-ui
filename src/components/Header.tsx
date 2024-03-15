import { Link, useNavigate } from "react-router-dom";
import { Input } from "./Input";
import authSlice from "../features/auth";
import { useDispatch } from "react-redux";
import { memo, useState, KeyboardEventHandler, MouseEventHandler } from "react";
import { Profile } from "./Profile";
import { RiLogoutBoxLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { PiChatsTeardropBold } from "react-icons/pi";

function _Header() {
  const [openProfile, setOpenProfile] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    dispatch(authSlice.actions.logout());
    navigate("/");
  };
  const handleSearchKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== "Enter") return;
    navigate(`/search/${search}`);
  };
  const toggleProfile = () => setOpenProfile(!openProfile);
  const handleProfile: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    toggleProfile();
  };

  return (
    <>
      <header className="bg-blue-500">
        <div className="flex flex-1">
          <div className="flex w-auto lg:w-[300px] px-4 my-3 h-10 items-center gap-4">
            <Link to="/" className="font-bold text-white ">
              <FaHome className="w-8 h-8" />
            </Link>
          </div>
          <div className="flex-1 my-3 h-10 hidden md:block">
            <Input
              className="h-10 min-w-[400px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={handleSearchKeyUp}
              placeholder="Search for users"
            />
          </div>
          <div className="flex flex-1 px-6 my-3 h-10 items-center justify-end gap-4">
            <Link to="/chats" className="font-bold text-white block md:hidden">
              <PiChatsTeardropBold className="w-7 h-7" />
            </Link>
            <a
              href=""
              onClick={handleProfile}
              className="font-bold text-white "
            >
              <CgProfile className="w-7 h-7" />
            </a>
            <a
              href="javascipt: void(0)"
              className="font-bold text-white "
              onClick={handleLogout}
            >
              <RiLogoutBoxLine className="w-7 h-7" />
            </a>
          </div>
        </div>
      </header>
      <Profile open={openProfile} toggle={toggleProfile} />
    </>
  );
}

const Header = memo(_Header);

export { Header };
