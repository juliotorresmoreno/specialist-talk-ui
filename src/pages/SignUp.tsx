import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import img from "../assets/pexels-visual-tag-mx-2566581.jpg";
import { useState } from "react";
import { SignUpPayload, signUp } from "../services/auth";
import authSlice from "../features/authSlice";
import { FetchError } from "../types/errors";
import toast, { Toaster } from "react-hot-toast";
import { Alert, Button } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFirstNameError("");
    setLastNameError("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    const payload: SignUpPayload = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
    };
    signUp(payload)
      .then((session) => {
        console.log(session);
        dispatch(authSlice.actions.login(session));
        navigation("/");
      })
      .catch((err: FetchError) => {
        if (!err.cause) {
          toast.error(err.message);
          return;
        }
        const cause = err.cause;
        if (cause.first_name) setFirstNameError(err.cause.first_name);
        if (cause.last_name) setLastNameError(err.cause.last_name);
        if (cause.username) setUsernameError(err.cause.username);
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
                Create your account
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First name
                  </label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    type="text"
                  />
                  {firstNameError && (
                    <Alert
                      color="failure"
                      className="mt-2"
                      icon={HiInformationCircle}
                    >
                      {firstNameError}
                    </Alert>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last name
                  </label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    type="text"
                  />
                  {lastNameError && (
                    <Alert
                      color="failure"
                      className="mt-2"
                      icon={HiInformationCircle}
                    >
                      {lastNameError}
                    </Alert>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Username
                  </label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    type="text"
                  />
                  {usernameError && (
                    <Alert
                      color="failure"
                      className="mt-2"
                      icon={HiInformationCircle}
                    >
                      {usernameError}
                    </Alert>
                  )}
                </div>
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
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                </div>
                <Button
                  type="submit"
                  className="rounded-none w-full"
                >
                  Register
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
