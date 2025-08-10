module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#22c55e', // Tailwind green-500
                    dark: '#16a34a',    // Tailwind green-600
                },
                secondary: {
                    DEFAULT: '#ef4444', // Tailwind red-500
                    dark: '#dc2626',    // Tailwind red-600
                },
                accent: {
                    DEFAULT: '#fbbf24', // Amber 400
                    dark: '#f59e0b',
                },
                neutral: {
                    light: '#f3f4f6',   // Gray 100
                    dark: '#1f2937',    // Gray 800
                },
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light", "dark"],
    },
};
