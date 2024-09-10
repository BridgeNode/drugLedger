import type { Metadata } from "next";
import { Dela_Gothic_One } from "next/font/google";
import "./globals.css";
import RainbowKitSetup from "@/context/rainbowkitSetup";
import { Toaster } from "react-hot-toast";
const gothic = Dela_Gothic_One({
   subsets: ["latin"],
   weight: "400",
    style: "normal" 
});

export const metadata: Metadata = {
   title: "DrugLedger",
   description: "Providing health through traceability",
};
console.log(gothic.className)

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={`${gothic.className}`}>
            <Toaster />
            <RainbowKitSetup>
               {children}
            </RainbowKitSetup>
         </body>
      </html>
   );
}
