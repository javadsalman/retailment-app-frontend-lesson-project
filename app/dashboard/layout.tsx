import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar.component';
import DashboardSidebar from '@/components/DashboardSidebar/DashboardSidebar.component';
import HelpCenterBadge from '@/components/HelpCenterBadge/HelpCenterBadge';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'rsuite/dist/rsuite-no-reset.min.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Detalista - Dashboard',
  description: `
    Detalista is a platform that allows you to create a shopping list and share it with your friends and family. 
    You can add items to your shopping list, mark them as purchased, and share the list with your friends and family. 
    You can also add notes to the items on your shopping list, so you can remember why you added them to the list in the first place. 
    Detalista is a great way to stay organized and make sure you never forget anything on your shopping list again!
  `,
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main lang='en' className='flex items-center w-screen'>
      <DashboardSidebar />
      <section
        className={`flex-1 h-screen overflow-y-auto relative ${inter.className}`}
      >
        <DashboardNavbar />
        <div className='p-5'>{children}</div>
        <HelpCenterBadge />
      </section>
    </main>
  );
}
