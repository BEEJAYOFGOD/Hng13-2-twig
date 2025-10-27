/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./templates/**/*.twig", "./public/**/*.php"],
    theme: {
        extend: {
            colors: {
                primary: "#1e40af",
                secondary: "#64748b",
                // blue-600
                "primary-foreground": "#ffffff",
                foreground: "#111827", // gray-900
                "muted-foreground": "#6b7280", // gray-500
                card: "#ffffff",
                border: "#e5e7eb",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
