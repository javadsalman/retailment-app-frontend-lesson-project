'use client';
import React from 'react';
import styles from './login.module.scss';
import Image from 'next/image';
import logo from '@/public/assets/Detalista.png';
import { Button, Input, InputGroup } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const [visible, setVisible] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
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

  const login = async () => {
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

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    navigate.push('/dashboard/adilvalizada');

    // login();

    setUsername('');
    setPassword('');
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
              placeholder='Detalist username'
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
              placeholder='Detalist password'
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
            onClick={handleLogin}
            block
          >
            <strong>Log in</strong>
          </Button>
        </form>
      </div>
      <Link href='/register' className='mt-5'>
        You don't have an account? Register here
      </Link>
    </div>
  );
};

export default Login;
