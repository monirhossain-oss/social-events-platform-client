/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // Tailwind dark mode class strategy
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#4F46E5", // Indigo 600
                    dark: "#4338CA",    // Darker shade for hover
                },
                secondary: {
                    DEFAULT: "#EC4899", // Pink 500
                    dark: "#DB2777",
                },
                accent: {
                    DEFAULT: "#FBBF24", // Amber 400
                    dark: "#F59E0B",
                },
                neutral: {
                    light: "#F3F4F6",   // Gray 100
                    dark: "#1F2937",    // Gray 800
                },
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light", "dark"], // DaisyUI থিম গুলো
    },
};
