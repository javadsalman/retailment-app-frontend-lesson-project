import React from 'react';
import styles from './stores.module.scss';
import { FaStore } from 'react-icons/fa';
import { Button } from 'rsuite';
const Stores = () => {
  return (
    <div className={styles.stores}>
      <div className={styles.emptyStores}>
        <div className={styles.emptyStoresHeader}>
          <FaStore />
          <h1>
            You don't have any store yet. <br /> Add one to start managing your
            products.
          </h1>
        </div>
        <Button
          style={{
            backgroundColor: '#9cff1e',
            marginTop: '15px',
          }}
          type='button'
          appearance='subtle'
        >
          <strong>Add a new store</strong>
        </Button>
      </div>
    </div>
  );
};

export default Stores;
