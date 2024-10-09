import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"
import 'console-polyfill';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true
    },
    define: {
        'process.env': JSON.stringify(process.env)
    }
})