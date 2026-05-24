import { Barlow_Condensed, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast';
import ConditionalPageShow from "@/components/ConditionalPageShow";
import FacilityCardOfHomePage from '@/components/FacilityCardOfHomePage';
import Footer from "@/components/Footer";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensed", 
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plus-jakarta",
});

export const metadata = {
  title: "TurfZone | Premium Sports Facility Booking",
  description: "Book your favorite football turfs, badminton courts, and sports slots instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${plusJakartaSans.variable}`}
    >
      <body className="font-body bg-[#122926] text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <ConditionalPageShow>
          <FacilityCardOfHomePage />
        </ConditionalPageShow>
        <Footer />
        <Toaster position="top-right" reverseOrder={true}/>
      </body>
    </html>
  );
}
