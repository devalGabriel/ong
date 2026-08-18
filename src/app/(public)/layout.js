import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import { getSiteSettings } from "@/lib/settings/get-site-settings";

export default async function PublicLayout({ children }) {
  const settings = await getSiteSettings();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Sari la conținutul principal
      </a>
      <Header organizationName={settings.organizationName} />
      <main id="main-content">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
