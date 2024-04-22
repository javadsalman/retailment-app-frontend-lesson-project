'use client';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { FaStore } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Button, Input, InputGroup, SelectPicker } from 'rsuite';
import { loadAccessTokensFromLocalStorage } from '@/src/utils/authentication';
import axios from 'axios';
import { ItemDataType } from 'rsuite/esm/MultiCascadeTree';

interface ICategory {
  id: number;
  title: string;
  updated: string;
  created: string;
}

const AddEmployee = () => {
  const router = useRouter();
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [fullName, setFullName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [category, setCategory] = React.useState<number|null>(null);
  const [salary, setSalary] = React.useState('');
  const [salaryDay, setSalaryDay] = React.useState('');

  const addEmployee = () => {
    const token = loadAccessTokensFromLocalStorage();
    if (!fullName || !phoneNumber || !category || !salary) {
      window.alert('Please fill all fields');
      return;
    }
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}employee/employees/`,
        {
          full_name: fullName,
          phone: phoneNumber,
          category: category,
          salary: salary,
          salary_day: salaryDay,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        router.back();
      });
  }

  React.useEffect(() => {
    const token = loadAccessTokensFromLocalStorage();
    if (!token) {
      return;
    }
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}employee/employee_categories/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data as ICategory[]);
      });
  }, []);

  const backToBefore = () => {
    router.back();
  };
  return (
    <div>
      <div className='mb-10 flex items-center'>
        <IoArrowBackOutline
          size={30}
          color={'white'}
          onClick={backToBefore}
          className='cursor-pointer me-2'
        />
        <h1
          onClick={backToBefore}
          className='text-2xl cursor-pointer text-white'
        >
          Add a new employee
        </h1>
      </div>

      <form>
        <label className='mb-3 mt-3 inline-block' htmlFor='storeaddress'>
          Full Name
        </label>
        <Input
          style={{
            padding: '15px',
          }}
          id='storeaddress'
          placeholder='Enter full name'
          value={fullName}
          onChange={(value) => setFullName(value)}
        />
        <label className='mb-3 mt-3 inline-block' htmlFor='storename'>
          Phone Number
        </label>
        <Input
          style={{
            padding: '15px',
          }}
          id='storename'
          placeholder='Enter phone number'
          value={phoneNumber}
          onChange={(value) => setPhoneNumber(value)}
        />
        <div>
          <label className='mb-3 mt-3 inline-block' htmlFor='storename'>
            Category
          </label>
          <SelectPicker
            data={categories.map((category) => ({label: category.title, value: category.id} as ItemDataType))}
            style={{
              width: '100%',
              height: 51,
            }}
            id='storename'
            placeholder='Select a category'
            value={category}
            onChange={(value) => setCategory(Number(value))}
          />
        </div>
        <label className='mb-3 mt-3 inline-block' htmlFor='storeaddress'>
          Salary
        </label>
        <Input
          style={{
            padding: '15px',
          }}
          id='storeaddress'
          placeholder='Enter salary'
          value={salary}
          onChange={(value) => setSalary(value)}
        />
        <label className='mb-3 mt-3 inline-block' htmlFor='storeaddress'>
          Salary Day
        </label>
        <Input
          style={{
            padding: '15px',
          }}
          id='storeaddress'
          placeholder='Enter Salary Day'
          value={salaryDay}
          onChange={(value) => setSalaryDay(value)}
        />

        <Button
          style={{
            backgroundColor: '#9cff1e',
            marginTop: '20px',
            padding: '15px',
          }}
          type='button'
          appearance='subtle'
          onClick={addEmployee}
        >
          <strong>Add a new employee</strong>
        </Button>
      </form>
    </div>
  );
};

export default AddEmployee;
