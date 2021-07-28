import Header from "./components/Header";
import Login from "./components/Login";
import Main from "./components/Main";
import Register from "./components/Register";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppReducer from "./reducers/AppReducer";
import {useEffect, useCallback, useReducer } from "react";
import AppContext from "./components/AppContext";
import axios from "axios";

function App() {
  const initialState = { user: null, post: [] };
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //check current khi ma user reload lai app ma ko cap nhat duoc ten trong Appcontext (quay ve default la null)
  const checkCurrentUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const options = {
        method: "get",
        url: "/api/v1/auth/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios(options);
      if (response.data.data.user) {
        const { userName } = response.data.data.user;
        dispatch({ type: "CURRENT_USER", payload: { userName } });
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    checkCurrentUser()
    
  }, [checkCurrentUser])

  return (
    <Router>
      {/* Provider tiep nhan thong tin truy cap vao  */}
      <AppContext.Provider value={{ state, dispatch }}>
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
