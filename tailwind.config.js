/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    theme: {
        fontFamily: {
            'secondary': ["Bebas Neue", "sans-serif"],
            'primary': ["Poppins", "sans-serif"],
        },
        extend: {
            container: {
                center: true,
                padding: '24px',
                screens: {
                    '2xl': '1328px',
                    '3xl': '1642px',
                },
            },
            screens: {
                '2lg': '1150px',
                '2xl': '1328px',
                '3xl': '1642px',
            },
            colors: {
                'dark-blue': '#151721',
                'blue': '#02A1D3',
                'text-black': '#151515',
                'gray':'#F8F8F8',
            },
        },
    },
    plugins: [],
}
