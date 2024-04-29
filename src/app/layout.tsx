import Navbar from "@/components/navbar";
import Providers from "@/components/Provider";
import { cn, constructMetadata } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          inter.className
        )}>
        <main className="relative flex flex-col min-h-screen">
          <Providers>
            <Navbar />
            <div className="flex-grow flex-1">{children}</div>
            {/* <Footer /> */}
            <Footer />
          </Providers>
        </main>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
