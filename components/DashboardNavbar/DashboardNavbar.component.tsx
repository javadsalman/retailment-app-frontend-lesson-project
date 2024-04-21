'use client';
import React from 'react';
import styles from './DashboardNavbar.module.scss';
import { BiSolidBell, BiSolidBellRing } from 'react-icons/bi';
import { RiSettings5Fill } from 'react-icons/ri';
import Popup from 'reactjs-popup';

const DashboardNavbar = () => {
  const date = new Date();
  const hours = date.getHours();
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

  return (
    <div className={styles.navbar}>
      <div className={styles.headerLeft}>
        <h1 className={styles.headerText}>
          Hello <span>{user?.fullname}</span>{' '}
          <span className={styles.wave}>👋🏻</span>
        </h1>
        <div className={styles.date}>
          {date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          |{' '}
          {hours < 12
            ? 'Good Morning ☀️'
            : hours < 18
            ? 'Good Afternoon 🌤'
            : 'Good Evening 🌙'}
        </div>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.notification}>
          <Popup
            trigger={
              <span>
                <span
                  className={`
            absolute 
            rounded-full 
            px-1 
            text-xs
            cursor-pointer
            ${styles.notificationCount}
          `}
                >
                  3
                </span>
                <BiSolidBell
                  className='cursor-pointer'
                  size={26}
                  color={'#7c7c7c'}
                />
              </span>
            }
            contentStyle={{
              width: '200px',
              padding: '10px',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
              color: '#7c7c7c',
              marginTop: '5px',
            }}
            arrow={false}
            position='bottom right'
          >
            <div className='flex items-center justify-center'>
              Not implemented yet
            </div>
          </Popup>
        </div>
        <div className={styles.settings}>
          <Popup
            trigger={
              <span>
                <RiSettings5Fill
                  className='cursor-pointer'
                  size={26}
                  color={'#7c7c7c'}
                />
              </span>
            }
            contentStyle={{
              width: '200px',
              padding: '10px',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
              color: '#7c7c7c',
              marginTop: '5px',
            }}
            arrow={false}
            position='bottom right'
          >
            <div className='flex items-center justify-center'>
              Not implemented yet
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
