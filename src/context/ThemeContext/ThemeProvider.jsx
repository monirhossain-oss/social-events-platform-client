import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    // Load theme from localStorage or default to light
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const initialTheme = savedTheme || "light";
        setTheme(initialTheme);
        // DaisyUI theme attribute
        document.documentElement.setAttribute("data-theme", initialTheme);

        // Tailwind dark class toggle
        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
            document.documentElement.setAttribute("data-theme", "dark");
            document.documentElement.classList.add("dark");
        } else {
            setTheme("light");
            localStorage.setItem("theme", "light");
            document.documentElement.setAttribute("data-theme", "light");
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
