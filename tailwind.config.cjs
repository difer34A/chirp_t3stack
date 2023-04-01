/** @type {import('tailwindcss').Config} */
const config = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                Primary: {
                    100: "#ebd2fa",
                    200: "#d7a5f5",
                    300: "#c477f1",
                    400: "#b04aec",
                    500: "#9c1de7",
                    600: "#7d17b9",
                    700: "#5e118b",
                    800: "#3e0c5c",
                    900: "#1f062e"
                },
            }
        },
    },
    plugins: [],
    variants: {
        extend: {
            display: ["group-hover"],
        },
    },
};

module.exports = config;
