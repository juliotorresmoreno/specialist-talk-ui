import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import img from "../assets/pexels-visual-tag-mx-2566581.jpg";

export function SignUp() {
  return (
    <div>
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
              <form action="#">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First name
                  </label>
                  <input
                    className="shadow-sm w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last name
                  </label>
                  <input
                    className="shadow-sm w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    className="shadow-sm w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    className="shadow-sm w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
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
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
