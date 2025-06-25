import Header from "@/components/home/Header";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import ReduxProvider from "@/store/Provider";
import Footer from "@/components/home/Footer";

export const metadata = {
  title: "Pet Caart",
  description: "A e-commerce platform for pet products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="font-gotham-rounded">
      <body className="antialiased">
        <ReduxProvider>
          <QueryProvider>{children}</QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
