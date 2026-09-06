import "./globals.css";

export const metadata = {
  title: "ClipForge",
  description: "Turn long videos into ready-to-post Shorts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}