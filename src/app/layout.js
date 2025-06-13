import "./globals.css";

export const metadata = {
  title: "Pet Caart",
  description: "A e-commerce platform for pet products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="font-gotham-rounded">
      <body className="antialiased">{children}</body>
    </html>
  );
}
