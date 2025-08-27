import "./globals.css";
import Provider from "@/components/Provider";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Xem Phim Online Miễn Phí - Chất Lượng HD",
  description:
    "Xem phim online chất lượng cao miễn phí, phim mới nhất 2024, phim lẻ, phim bộ Việt Nam, Hàn Quốc, Trung Quốc",
  keywords: "xem phim online, phim mới, phim hay, phim HD, phim miễn phí",
  openGraph: {
    title: "Xem Phim Online Miễn Phí",
    description: "Website xem phim online chất lượng cao miễn phí",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="antialiased" suppressHydrationWarning={true}>
        <Provider>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
