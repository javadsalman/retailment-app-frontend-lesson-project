import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'rsuite/dist/rsuite-no-reset.min.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Detalista - Home',
  description: `Detalista is a platform that allows you to create a shopping list and share it with your friends and family. 
    You can add items to your shopping list, mark them as purchased, and share the list with your friends and family. 
    You can also add notes to the items on your shopping list, so you can remember why you added them to the list in the first place. 
    Detalista is a great way to stay organized and make sure you never forget anything on your shopping list again!`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
