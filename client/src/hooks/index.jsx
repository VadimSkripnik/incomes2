import { useState, useEffect } from "react";
export const useTheme = () => {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || "dark"
  );
  const darkTheme = "#2c313a";
  const lightTheme = "#e5e5e5";

  const setCurrentMode = () => {
    const links = document.querySelector(".auth-wrap");
    links.style.background = theme === "dark" ? darkTheme : lightTheme;
  };

  const switchTheme = () => {
    const inverseMode = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", JSON.stringify(inverseMode));

    setCurrentMode(theme);

    setTheme(inverseMode);
  };

  useEffect(() => {
    setCurrentMode(theme);
  }, [theme]);

  return { switchTheme, theme };
};
