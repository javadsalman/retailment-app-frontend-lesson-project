'use client';

import React from 'react';
import styles from './stores.module.scss';
import { FaStore } from 'react-icons/fa';
import { Button } from 'rsuite';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { loadAccessTokensFromLocalStorage } from '@/src/utils/authentication';


const Stores = () => {
  const [stores, setStores] = React.useState([]);
  const router = useRouter();
  
  const loadStores = async () => {
    const token = loadAccessTokensFromLocalStorage();
    if (!token) {
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}store/stores/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    loadStores().then((data) => {
      if (data && data.length > 0) {
        setStores(data);
      }
    });
  }, []);
  return (
    <div className={styles.stores}>
      {stores && stores.length === 0 && (
        <div className={styles.emptyStores}>
          <div className={styles.emptyStoresHeader}>
            <FaStore />
            <h1>
              You don't have any store yet. <br /> Add one to start managing
              your products.
            </h1>
          </div>
          <Button
            style={{
              backgroundColor: '#9cff1e',
              marginTop: '15px',
            }}
            type='button'
            appearance='subtle'
            onClick={() => router.push('/dashboard/stores/add')}
          >
            <strong>Add a new store</strong>
          </Button>
        </div>
      )}

      <div className={styles.storesList}>
        <div className={styles.storeTitle}>
          <h1>Name</h1>
          <p>Address</p>
        </div>
        {stores &&
          stores.map((store: any) => {
            return (
              <div key={store.id} className={styles.store}>
                <h1>{store.title}</h1>
                <p>{store.address}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Stores;
