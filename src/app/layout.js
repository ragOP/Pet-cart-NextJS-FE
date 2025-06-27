import Wrapper from "@/components/layout/Wrapper";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import ReduxProvider from "@/store/Provider";
import { getHeaderFooter } from "./apis/getHeaderFooter";

export const metadata = {
  title: "Pet Caart",
  description: "A e-commerce platform for pet products",
};

export default async function RootLayout({ children }) {
  const headerFooterData = await getHeaderFooter().then((res) => res?.data?.data || {});

  return (
    <html lang="en" className="font-gotham-rounded">
      <body className="antialiased">
        <ReduxProvider>
          <QueryProvider>
            <Wrapper headerFooterData={headerFooterData}>{children}</Wrapper>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
