import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";
 
export const metadata = {
  title: "Aribnb",
  description: "Aribnb Clone",
};

const font = Nunito({
  subsets:['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="{font.className}">
        <ClientOnly>
           <Modal isOpen title="iam jay" />
           <Navbar />
        </ClientOnly>
        
        {children}
      </body>
    </html>
  );
}
