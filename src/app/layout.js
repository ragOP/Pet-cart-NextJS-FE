import "./globals.css";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Category from "@/components/home/Category";

export const metadata = {
  title: "Pet Caart",
  description: "A e-commerce platform for pet products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="font-gotham-rounded">
      <body className="antialiased">
      <Header />
      <Category />
        {children}
      <Footer />
      </body>
    </html>
  );
}
