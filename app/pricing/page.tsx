'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './pricing.module.scss';
import Image from 'next/image';

import logo from '@/public/assets/Detalista.png';
import { Button } from 'rsuite';
import { useRouter } from 'next/navigation';
import { TiTick } from 'react-icons/ti';

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const router = useRouter();
  const loadPlans = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}customer/subscriptions/`
      );
      setPlans(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <div className={styles.pricing}>
      <Image src={logo.src} alt='logo' width={150} height={50} />
      <h1 className='text-4xl font-bold text-center mt-10 mb-10'>Pricing</h1>
      <div className={styles.plans}>
        {plans &&
          plans.map((plan: any) => (
            <div
              key={plan?.id}
              className={`${styles.plan} ${
                plan?.title === 'Yearly Plan' ? styles.active : ''
              }`}
            >
              <h1 className={styles.title}>{plan?.title}</h1>
              <p className={styles.price}>${plan?.price}</p>
              <ul>
                <li className=' text-black flex items-center'>
                  <TiTick color='#9cff1e' className='me-3' size={16} />
                  <span>Long term support</span>
                </li>
                <li className='text-black flex items-center'>
                  <TiTick color='#9cff1e' className='me-3' size={16} />
                  <span>Unlimited access to all features</span>
                </li>

                <li className='text-black flex items-center '>
                  <TiTick color='#9cff1e' className='me-3' size={16} />
                  <span>Unlimeted products and services</span>
                </li>
              </ul>
              <Button
                style={{
                  backgroundColor: '#9cff1e',
                  marginTop: '15px',
                  padding: '20px',
                }}
                type='button'
                appearance='subtle'
                onClick={() => {
                  router.push(`/login`);
                }}
                block
              >
                <strong>Choose Plan</strong>
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Pricing;
