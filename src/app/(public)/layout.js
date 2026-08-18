import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Sari la conținutul principal
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
