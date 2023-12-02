import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Fix and Get",
  description:
    "An app that connects fixers to people that has an item to fix and sellers to people that needs to get something",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} h-screen w-screen flex flex-col overflow-hidden`}
      >
        {/* <Header /> */}
        {/* <p className="overflow-auto">
        </p> */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
