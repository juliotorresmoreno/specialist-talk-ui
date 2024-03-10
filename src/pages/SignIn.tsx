import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import img from "../assets/pexels-visual-tag-mx-2566581.jpg";
import { useState } from "react";
import { signIn } from "../services/auth";
import { authSlice } from "../features/auth";
import { FetchError } from "../types/errors";
import toast, { Toaster } from "react-hot-toast";
import { Alert, Button } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Input } from "../components/Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { email, password };
    signIn(payload)
      .then((session) => {
        dispatch(authSlice.actions.login(session));
        navigate("/");
      })
      .catch((err: FetchError) => {
        if (!err.cause) {
          toast.error(err.message);
          return;
        }
        const cause = err.cause;
        if (cause.email) setEmailError(err.cause.email);
        if (cause.password) setPasswordError(err.cause.password);
      });
  };

  return (
    <div className="mx-auto">
      <Toaster />
      <NavBar />

      <div className="flex items-center justify-center">
        <div className="flex flex-1 flex-row max-w-screen-xl">
          <div className="flex flex-1 justify-center">
            <img
              alt=""
              className="w-full object-cover aspect-[1/1]"
              src={img}
            />
          </div>
          <div className="flex flex-1 justify-center">
            <div className="flex-1 max-w-md bg-white shadow-md px-8 py-6 ">
              <h1 className="text-2xl font-bold text-center mb-4">
                Welcome Back!
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                  />
                  {emailError && (
                    <Alert
                      color="failure"
                      className="mt-2"
                      icon={HiInformationCircle}
                    >
                      {emailError}
                    </Alert>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                  />
                  {passwordError && (
                    <Alert
                      color="failure"
                      className="mt-2"
                      icon={HiInformationCircle}
                    >
                      {passwordError}
                    </Alert>
                  )}
                  <a
                    href="/recovery-password"
                    className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                      defaultChecked
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Button type="submit" className="rounded-none w-full enabled:hover:bg-blue-800 focus:ring-blue-300 focus:ring-2 bg-blue-500">
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
