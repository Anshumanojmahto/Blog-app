import { logIn, logOut } from "./features/auth/authSlice";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

import "./App.css";

function App() {
  const [loding, setLoding] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(logIn({ userData }));
        } else {
          dispatch(logOut());
        }
      })
      .finally(() => setLoding(false));
  }, []);
  return !loding ? (
    <>
      <div className="w-screen max-w-screen-xl mx-auto bg-gray-500 text-white">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  ) : null;
}

export default App;
