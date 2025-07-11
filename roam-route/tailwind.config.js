/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}", // Scans all HTML and TS files in /src
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'], // Optional: match the design style
            },
            colors: {
                // Custom colors from the design (you can adjust if needed)
                beige: "#EADAC1",
                dark: "#383833",
                accent: "#77866B",
                soft: "#F2EFE6",
            },
        },
    },
    plugins: [],
}