/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./index.html",
        // Adding more common paths to ensure all content is processed
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./pages/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                Montserrat: ['Montserrat', 'sans-serif']
            },
            animation: {
                meteor: 'meteor 5s linear infinite'
            },
            keyframes: {
                meteor: {
                    '0%': {
                        transform: 'rotate(215deg) translateX(0)',
                        opacity: '1'
                    },
                    '70%': {
                        opacity: '1'
                    },
                    '100%': {
                        transform: 'rotate(215deg) translateX(-500px)',
                        opacity: '0'
                    }
                }
            }
        }
    },
    plugins: [],
    future: {
        hoverOnlyWhenSupported: true,
    },
    // Adding safelist for dynamic classes if you're using them
    safelist: [
        {
            pattern: /^(.*?)/,
        },
    ],
}