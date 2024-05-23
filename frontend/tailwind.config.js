/** @type {import('tailwindcss').Config} */
export default {
     content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
          extend: {
               fontFamily: {
                    montserrat: ['Montserrat', 'sans-serif'],
               },
               backgroundImage: {
                    'custom-gradient': 'linear-gradient(172deg, #FBFEFF 17.89%, #C0C9CE 94.06%);'
               },
               fontSize: {
                    '3.5xl': '2.0625rem', // Exactly between 3xl and 4xl
               },
               screens: {
                    'max-lg': { 'max': '1024px' },  // Example for max-width of 1024px (lg breakpoint)
                    'max-md': { 'max': '768px' },   // Example for max-width of 768px (md breakpoint)
                    'max-sm': { 'max': '640px' },   // Example for max-width of 640px (sm breakpoint)
               },
          },
     },
     plugins: [],
}