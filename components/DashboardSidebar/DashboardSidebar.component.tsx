'use client';
import React from 'react';
import styles from './dashboardSidebar.module.scss';
import { FiLayout } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { PiCubeBold } from 'react-icons/pi';
import { FaStore, FaTruck } from 'react-icons/fa';
import { BsPeopleFill, BsPersonCircle } from 'react-icons/bs';
import { usePathname, useRouter } from 'next/navigation';
import { MdLogout } from 'react-icons/md';
import logo from '@/public/assets/Detalista.png';
import { IoPersonAdd } from 'react-icons/io5';

const DashboardSidebar = () => {
  const currentPath = usePathname().split('/')[2];
  const [user, setUser] = React.useState<null | {
    fullname: string;
    email: string;
    username: string;
    id: number;
  }>(null);

  const loadUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  };

  React.useEffect(() => {
    setUser(loadUserFromLocalStorage());
  }, []);

  const router = useRouter();

  return (
    <div className={styles.dashboardSidebar}>
      <div>
        <div className={styles.logoContainer}>
          <Link href={`/dashboard/${user?.username}`}>
            <Image src={logo.src} alt='logo' width={150} height={50} />
          </Link>
        </div>
        <div className={styles.sidebarMenu}>
          <ul>
            <li className={currentPath === user?.username ? styles.active : ''}>
              <FiLayout />
              <Link href='/dashboard/adil'>Dashboard</Link>
            </li>
            <li
              className={
                currentPath === 'products' || currentPath === 'add-product'
                  ? styles.active
                  : ''
              }
            >
              <PiCubeBold />
              <Link href='/dashboard/products'>Products</Link>
            </li>
            <li className={currentPath === 'orders' ? styles.active : ''}>
              <FaTruck />
              <Link href='/dashboard/orders'>Orders</Link>
            </li>
            <li
              className={
                currentPath === 'customers' || currentPath === 'add-customer'
                  ? styles.active
                  : ''
              }
            >
              <BsPeopleFill />
              <Link href='/dashboard/customers'>Customers</Link>
            </li>
            <li className={currentPath === 'employees' ? styles.active : ''}>
              <IoPersonAdd />
              <Link href='/dashboard/employees'>Employees</Link>
            </li>
            <li className={currentPath === 'stores' ? styles.active : ''}>
              <FaStore />
              <Link href='/dashboard/stores'>Stores</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.sidebarFooter}>
        <ul>
          <li
            className={
              currentPath === 'profile' || currentPath === 'edit-profile'
                ? styles.active
                : ''
            }
          >
            <BsPersonCircle />
            <Link href='/dashboard/profile'>Profile</Link>
          </li>
          <li
            onClick={() => {
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              router.push('/login');
            }}
          >
            <MdLogout />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
