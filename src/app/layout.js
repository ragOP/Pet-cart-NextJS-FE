import Wrapper from "@/components/layout/Wrapper";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import ReduxProvider from "@/store/Provider";
import { getHeaderFooter } from "./apis/getHeaderFooter";
import { Toaster } from "sonner";

export const metadata = {
  title: "Pet Caart",
  description: "A e-commerce platform for pet products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="font-gotham-rounded">
      <body className="antialiased">
        <ReduxProvider>
          <QueryProvider>
            <Wrapper>{children}</Wrapper>
            <Toaster />
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
