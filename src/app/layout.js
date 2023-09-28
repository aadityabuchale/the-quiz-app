import "./globals.css";
import { Inter, Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "React quiz app",
    description: "Generated by create next app",
};

const roboto = Roboto({
    weight: ["400", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={roboto.className}>
            <body>{children}</body>
        </html>
    );
}
