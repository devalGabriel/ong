import "@/styles/globals.css";

export const metadata = {
  title: {
    default: "[Numele Organizației]",
    template: "%s | [Numele Organizației]",
  },
  description: "[DE CONFIGURAT: descriere organizație]",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
