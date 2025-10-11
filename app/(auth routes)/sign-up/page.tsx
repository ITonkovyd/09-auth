"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthRequest } from '@/types/user'
import { register } from '@/lib/api/clientApi'
import { useAuthStore } from '@/lib/store/authStore'

const SignUp = () => {
  const router = useRouter()
  const [error, setError] = useState("");
  const setUser = useAuthStore(state => state.setUser)

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as AuthRequest;

      const res = await register(formValues);

      if (res) {
        setUser(res);
        router.push('/sign-in');
      } else {
        setError("Invalid email or password");
      }

    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Registration error:", error);
    }
  }

  return (
     <>
      <h1>Sign up</h1>
      <form action={handleSubmit}>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </>
  )
}

export default SignUp