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
import { Events } from "./Events";
import { Menu } from "./Menu";
import { Chats } from "../pages/Chats";

interface TemplateProps extends PropsWithChildren<{}> {}

const Template = (props: TemplateProps) => {
  const session = useSelector((state: RootState) => state.auth.session);

  if (!session) return props.children;

  return (
    <div className="flex flex-1 bg-blue-50">
      <div className="flex flex-1 flex-col mx-auto">
        <Header />
        <main className="flex flex-1">
          <div className="flex flex-1">
            <Routes>
            <Route path="/chats" element={null} />
              <Route
                path="*"
                element={
                  <div className="w-[300px] bg-white border-r-2 hidden md:block">
                    <Menu />
                  </div>
                }
              />
            </Routes>
            <div className="flex flex-1 bg-white">{props.children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export function Router() {
  const session = useSelector((state: RootState) => state.auth.session);
  return (
    <Template>
      <Events>
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
              <Route path="/chats/:username" element={<Chat />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/search/:q" element={<Search />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </Events>
    </Template>
  );
}
