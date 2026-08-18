import "@/styles/globals.css";

export const metadata = {
  title: {
    default: "Fii Schimbarea",
    template: "%s | Fii Schimbarea",
  },
  description: "Fii Schimbarea susține oamenii și spitalele din România, pentru un viitor mai bun și mai demn pentru toți.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
