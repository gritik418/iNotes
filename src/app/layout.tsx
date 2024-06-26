import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "@/providers/ReduxProvider";
import Authenticate from "@/components/Authenticate/Authenticate";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iNotes",
  description:
    "Introducing our notes website, a streamlined platform designed to simplify your note-taking experience. With a clean and intuitive interface, our website allows users to effortlessly create, organize, and access their notes from any device. Whether you're jotting down ideas, keeping track of tasks, or studying for exams, our notes website offers robust features and seamless synchronization across devices. Say goodbye to scattered scraps of paper and hello to efficient note-taking with our user-friendly platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <div>
          <ReduxProvider>
            <Authenticate />
            <ChakraProvider>
              {children}
              <ToastContainer />
            </ChakraProvider>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
