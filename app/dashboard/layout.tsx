'use client';
import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar.component';
import DashboardSidebar from '@/components/DashboardSidebar/DashboardSidebar.component';
import HelpCenterBadge from '@/components/HelpCenterBadge/HelpCenterBadge';

import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import 'rsuite/dist/rsuite-no-reset.min.css';
const inter = Inter({ subsets: ['latin'] });

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loadAccsessToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    }
    return null;
  };

  useEffect(() => {
    if (!loadAccsessToken()) {
      window.location.href = '/login';
    }
  }, []);
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
