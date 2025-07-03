import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeProvider";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className=" rounded-full text-2xl   text-black dark:text-white"
        >
            {theme === 'dark' ? '☀️' :'🌙'}
        </button>
    );
};

export default ThemeToggle;
