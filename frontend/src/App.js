import Header from "./components/Header";
import Login from "./components/Login";
import Main from "./components/Main";
import Register from "./components/Register";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppReducer from "./reducers/AppReducer";
import { useReducer } from "react";
import AppContext from "./components/AppContext";

function App() {
  const initialState = { user: null, post: [] };
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <Router>
      {/* Provider tiep nhan thong tin truy cap vao  */}
      <AppContext.Provider value={{state, dispatch}}>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/">
              {/* Main component => homepage khi user dang nhap */}
              <Main />
            </Route>
            <Route exact path="*">
              <div>Page not found</div>
            </Route>
          </Switch>
        </div>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
