import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Router } from "./components/Router";
import { Session } from "./components/Session";

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Session>
          <Router />
        </Session>
      </BrowserRouter>
    </Provider>
  );
}

export default Root;
