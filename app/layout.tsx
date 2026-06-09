import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مجالات الحياة المدرسية",
  description: "موقع مراجعة تفاعلي حول مجالات الحياة المدرسية."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
