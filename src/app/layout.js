import Wrapper from "@/components/layout/Wrapper";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import ReduxProvider from "@/store/Provider";
import { getHeaderFooter } from "./apis/getHeaderFooter";
import { Toaster } from "sonner";
import "@/styles/hide-scrollbar.css";

export const metadata = {
  title: "Pet Caart",
  description: "A e-commerce platform for pet products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="font-gotham-rounded hide-scrollbar">
      <body className="antialiased hide-scrollbar">
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
