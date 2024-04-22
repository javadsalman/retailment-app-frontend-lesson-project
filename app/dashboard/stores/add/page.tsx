'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { FaStore } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Button, Input, InputGroup } from 'rsuite';
import { loadAccessTokensFromLocalStorage } from '@/src/utils/authentication';

const AddStore = () => {
  const router = useRouter();
  const [storeName, setStoreName] = React.useState('');
  const [storeAddress, setStoreAddress] = React.useState('');

  const backToBefore = () => {
    router.back();
  };

  const addStore = useCallback(() => {
    const token = loadAccessTokensFromLocalStorage();
    if (!storeName || !storeAddress) {
      window.alert('Please fill all fields');
      return;
    }
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}store/stores/`, {
      title: storeName,
      address: storeAddress,
    },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((response) => {
      backToBefore();
    })
  }, [storeName, storeAddress])
  
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
          value={storeName}
          onChange={(value) => setStoreName(value)}
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
          value={storeAddress}
          onChange={(value) => setStoreAddress(value)}
        />

        <Button
          style={{
            backgroundColor: '#9cff1e',
            marginTop: '20px',
            padding: '15px',
          }}
          type='button'
          appearance='subtle'
          onClick={addStore}
        >
          <strong>Add a new store</strong>
        </Button>
      </form>
    </div>
  );
};

export default AddStore;
