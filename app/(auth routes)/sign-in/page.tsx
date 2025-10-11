"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthRequest } from '@/types/user';
import { login } from '@/lib/api/clientApi';
import { ApiError } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as AuthRequest;

      const res = await login(formValues);

      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      )
    }
  };

  return (
    <>
      <form action={handleSubmit}>
        <h1>Sign in</h1>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit">Log in</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};

export default SignIn