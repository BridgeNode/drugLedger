import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RainbowKitSetup from "@/context/rainbowkitSetup";
import { Toaster } from "react-hot-toast";
import GraphProvider from "@/context/graph";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "DrugLedger",
   description: "Providing health through traceability",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={`${inter.className}`}>
            <Toaster />
            <RainbowKitSetup>
               <GraphProvider>
               {children}
               </GraphProvider>
            </RainbowKitSetup>
         </body>
      </html>
   );
}
