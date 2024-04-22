'use client';

import React, { useEffect } from 'react';
import styles from './employee.module.scss';
import { Button } from 'rsuite';
import { useRouter } from 'next/navigation';
import { IoPersonAddSharp } from 'react-icons/io5';
import axios from 'axios';
import { loadAccessTokensFromLocalStorage } from '@/src/utils/authentication';
const Employees = () => {
  const [employees, setEmployees] = React.useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = loadAccessTokensFromLocalStorage();
    axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}employee/employees/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
      ).then((response) => {
          setEmployees(response.data);
      }
    );
  }, []);

  console.log(employees);
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
        <div className={styles.employeeTitle}>
          <h1>Full Name</h1>
          <p>Phone</p>
          <p>Salary</p>
          <p>Salary Day</p>
        </div>
        {employees &&
          employees.map((employee: any) => {
            return (
              <div key={employee.id} className={styles.employee}>
                <h1>{employee.full_name}</h1>
                <p>{employee.phone}</p>
                <p>{employee.salary}</p>
                <p>{employee.salary_day}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Employees;
