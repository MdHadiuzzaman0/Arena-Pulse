import { Barlow_Condensed, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'

// হেডিং বা স্পোর্টস ভাইব টেক্সটের জন্য Barlow Condensed
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensed", 
});

// সাধারণ প্যারাগ্রাফ বা বডি টেক্সটের জন্য Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plus-jakarta",
});

export const metadata = {
  title: "Arena Pulse | Premium Sports Facility Booking",
  description: "Book your favorite football turfs, badminton courts, and sports slots instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${plusJakartaSans.variable}`}
    >
      <body className="font-body bg-[#122926] text-white antialiased">
        <Navbar/>
        <main>{children}</main>

        </body>
    </html>
  );
}
