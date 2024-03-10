import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CartProvider from './components/Providers';
import Navbar from './components/Navbar';
import ShoppingCartModal from './components/ShoppingCartModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: "Guru's Retro kits",
    description: 'Created by Guru Hariharan',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} dark`}>
                <CartProvider>
                    <Navbar />
                    <ShoppingCartModal />
                    {children}
                </CartProvider>
            </body>
        </html>
    );
}
