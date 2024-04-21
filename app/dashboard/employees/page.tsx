'use client';

import React from 'react';
import styles from './stores.module.scss';
import { Button } from 'rsuite';
import { useRouter } from 'next/navigation';
import { IoPersonAddSharp } from 'react-icons/io5';
const Employees = () => {
  const [employees, setEmployees] = React.useState([]);
  const router = useRouter();

  return (
    <div className={styles.stores}>
      {employees && employees.length === 0 && (
        <div className={styles.emptyStores}>
          <div className={styles.emptyStoresHeader}>
            <IoPersonAddSharp />
            <h1>
              You don't have any employee yet. <br /> Add a new employee
            </h1>
          </div>
          <Button
            style={{
              backgroundColor: '#9cff1e',
              marginTop: '15px',
            }}
            type='button'
            appearance='subtle'
            onClick={() => router.push('/dashboard/employees/add')}
          >
            <strong>Add a new employee</strong>
          </Button>
        </div>
      )}

      <div className={styles.storesList}>
        {employees &&
          employees.map((store: any) => {
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

export default Employees;
