import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ARIS Sample Manager",
  description:
    "The ARIS Sample Manager is an application designed to automate the process of data entry for laboratory samples related to water testing. This system aims to streamline the workflow of collecting, recording, and managing sample data, enhancing efficiency and accuracy in laboratory operations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
