import "./globals.css";

export const metadata = {
  title: "Group 1 Web App",
  description: "Please let me win TwT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
