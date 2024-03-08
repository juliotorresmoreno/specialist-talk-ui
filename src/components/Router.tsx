import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Landing } from "../pages/Landing";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { Chat } from "../pages/Chat";
import { Search } from "../pages/Search";
import { Header } from "./Header";
import { PropsWithChildren } from "react";

interface TemplateProps extends PropsWithChildren<{}> {}

const Template = (props: TemplateProps) => {
  const session = useSelector((state: RootState) => state.auth.session);

  if (!session) return props.children;

  return (
    <div className="flex flex-1 bg-blue-50 p-1">
      <div className="flex flex-1 flex-col max-w-screen-2xl mx-auto">
        <Header />
        {props.children}
      </div>
    </div>
  );
};

export function Router() {
  const session = useSelector((state: RootState) => state.auth.session);
  return (
    <Template>
      <Routes>
        {!session ? (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="/chats/:username" element={<Chat />} />
            <Route path="/search/:q" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </Template>
  );
}
