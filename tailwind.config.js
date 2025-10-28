/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./templates/**/*.twig", "./public/**/*.php", "./public/**/*.js"], // Add JS files!
    safelist: [
        // Status badge colors
        "bg-green-100",
        "text-green-800",
        "border-green-300",
        "bg-amber-100",
        "text-amber-800",
        "border-amber-300",
        "bg-gray-100",
        "text-gray-800",
        "border-gray-300",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0EA5E9", // bg-blue-600
                secondary: "#64748b", // slate-500
                hover: "#0891b2",
                "primary-foreground": "#ffffff",
                foreground: "#111827", // gray-900
                "muted-foreground": "#6b7280", // gray-500
                card: "#ffffff",
                border: "#e5e7eb", // gray-200
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
