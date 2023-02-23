import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../components/ui/loginForm";
import Footer from "../components/ui/footer";
import RegisterForm from "../components/ui/registerForm";
import { getIsLoggedIn } from "../store/users";
import { useTheme } from "../hooks";

const Login = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const navigate = useNavigate();

  const { switchTheme, theme } = useTheme();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    } else {
      navigate("/home");
    }
  }, [isLoggedIn]);
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );
  const toggleFormType = (params) => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <>
      <div className="ws-layout-column ws-align-items-start-center auth-wrap">
        <div className="container">
          <button
            onClick={switchTheme}
            className={`btn btn-theme btn-${
              theme === "dark" ? "light" : "dark"
            }`}
          >
            {theme === "dark" ? "Go light" : "Go dark"}
          </button>
        </div>

        <div className="ws-layout-column ws-align-items-center auth-wrap__content">
          {formType === "register" ? (
            <>
              <RegisterForm toggleFormType={toggleFormType} />
            </>
          ) : (
            <>
              <LoginForm toggleFormType={toggleFormType} />
            </>
          )}
        </div>

        <Footer />
      </div>

      <div className="Toastify"></div>
    </>
  );
};

export default Login;
