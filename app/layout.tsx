import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://deanooooooooo.github.io/master-plumber-manchester"),
  title: "Master Plumber Manchester Ltd | Manchester Plumber",
  description:
    "Manchester plumbing, heating, bathroom refurbishment, boiler installation and general repair enquiries through Master Plumber Manchester Ltd.",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Master Plumber Manchester Ltd | Manchester Plumber",
    description:
      "Bathroom refurbishments, plumbing, heating and boiler installation enquiries across the Manchester area.",
    url: "https://deanooooooooo.github.io/master-plumber-manchester/",
    images: ["/assets/walk-in-shower.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Plumber Manchester Ltd | Manchester Plumber",
    description:
      "Bathroom refurbishments, plumbing, heating and boiler installation enquiries across Manchester.",
    images: ["/assets/walk-in-shower.jpeg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
