import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeProvider";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="rounded-full text-2xl cursor-pointer text-black dark:text-white"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? "🌙" : "☀️"}
        </button>
    );
};

export default ThemeToggle;
