'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaStore } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Button, Input, InputGroup } from 'rsuite';

const AddStore = () => {
  const router = useRouter();

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
          Add a new store
        </h1>
      </div>

      <form>
        <label className='mb-3 inline-block' htmlFor='storename'>
          Store Name
        </label>
        <Input
          style={{
            padding: '15px',
          }}
          id='storename'
          placeholder='Enter store name'
        />

        <label className='mb-3 mt-3 inline-block' htmlFor='storeaddress'>
          Store Address
        </label>
        <Input
          style={{
            padding: '15px',
          }}
          id='storeaddress'
          placeholder='Enter store address'
        />

        <Button
          style={{
            backgroundColor: '#9cff1e',
            marginTop: '20px',
            padding: '15px',
          }}
          type='button'
          appearance='subtle'
        >
          <strong>Add a new store</strong>
        </Button>
      </form>
    </div>
  );
};

export default AddStore;
