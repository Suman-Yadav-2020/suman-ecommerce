// app/layout.tsx
import "@/styles/globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";

export const metadata = { title: "My E-Store" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="p-6">{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
