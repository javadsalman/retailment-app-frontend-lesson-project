'use client';
import React from 'react';
import styles from './register.module.scss';
import Image from 'next/image';
import logo from '@/public/assets/Detalista.png';
import { Button, Input, InputGroup } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Register = () => {
  const [visible, setVisible] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');

  const [error, setError] = React.useState<string | null>(null);
  const navigate = useRouter();

  const handleChange = () => {
    setVisible(!visible);
  };

  const setLocalStorage = (data: any) => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        fullname: data.firstname + ' ' + data.lastname,
        email: data.email,
        username: data.username,
        id: data.id,
      })
    );

    localStorage.setItem('token', data.token);
  };

  const register = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}customer/customers/login/`,
        {
          user_info: username,
          password,
        }
      );

      if (response) {
        console.log(response.data);

        // setLocalStorage(response.data);
        // navigate('/dashboard/${response.data.user}');
      }
    } catch (error) {
      console.error(error);
      setError('Invalid username or password');
    }
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    if (!username || !password || !name || !surname) {
      setError('All fields are required');
      return;
    }

    register();

    setUsername('');
    setPassword('');
    setName('');
    setSurname('');
  };

  return (
    <div className={styles.login}>
      <Image
        className='mb-5'
        src={logo}
        alt='Detalista'
        width={200}
        height={100}
      />
      <div className={styles.loginContainer}>
        <form className={styles.loginForm}>
          <label htmlFor='name'>
            Name
            <span className={styles.required}>*</span>
          </label>
          <InputGroup
            style={{
              marginBottom: '15px',
            }}
          >
            <Input
              style={{
                padding: '10px',
              }}
              id='name'
              placeholder='Your name'
              value={name}
              onChange={(value: string) => {
                setName(value);
              }}
            />
            <InputGroup.Addon>
              <AvatarIcon />
            </InputGroup.Addon>
          </InputGroup>
          <label htmlFor='surname'>
            Surname
            <span className={styles.required}>*</span>
          </label>
          <InputGroup
            style={{
              marginBottom: '15px',
            }}
          >
            <Input
              style={{
                padding: '10px',
              }}
              id='surname'
              placeholder='Your surname'
              value={surname}
              onChange={(value: string) => {
                setSurname(value);
              }}
            />
            <InputGroup.Addon>
              <AvatarIcon />
            </InputGroup.Addon>
          </InputGroup>
          <label htmlFor='username'>
            Username
            <span className={styles.required}>*</span>
          </label>
          <InputGroup
            style={{
              marginBottom: '15px',
            }}
          >
            <Input
              style={{
                padding: '10px',
              }}
              id='username'
              placeholder='Your username'
              value={username}
              onChange={(value: string) => {
                setUsername(value);
              }}
            />
            <InputGroup.Addon>
              <AvatarIcon />
            </InputGroup.Addon>
          </InputGroup>
          <label htmlFor='password'>
            Password
            <span className={styles.required}>*</span>
          </label>
          <InputGroup inside>
            <Input
              id='password'
              placeholder='Your password'
              type={visible ? 'text' : 'password'}
              style={{
                padding: '10px',
              }}
              value={password}
              onChange={(value: string) => {
                setPassword(value);
              }}
            />
            <InputGroup.Button onClick={handleChange}>
              {visible ? <EyeIcon /> : <EyeSlashIcon />}
            </InputGroup.Button>
          </InputGroup>
          <div className={styles.error}>{error && <span>{error}</span>}</div>
          <Button
            style={{
              backgroundColor: '#9cff1e',
              marginTop: '15px',
            }}
            type='button'
            appearance='subtle'
            onClick={handleRegister}
            block
          >
            <strong>Register</strong>
          </Button>
        </form>
      </div>
      <Link href='/login' className='mt-5'>
        Already have an account?
      </Link>
    </div>
  );
};

export default Register;