'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AvatarPicker from '@/components/AvatarPicker/AvatarPicker';
import { getMe, updateMe } from '@/lib/api/clientApi';
import css from '@/components/AvatarPicker/EditProfilePage.module.css';

const EditProfile = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

	useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? '');
      setPhotoUrl(user.avatar ?? '');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateMe({ username: userName });
      router.push('/profile');
    } catch (error) {
      console.error('Oops, some error:', error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <section className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit profile</h1>
        <AvatarPicker profilePhotoUrl={photoUrl} />
        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="userName">Username</label>
            <input 
              id="userName"
              type='text' 
              value={userName} 
              onChange={handleChange} 
              className={css.input}
              placeholder="Enter your username"
            />
          </div>
          <div className={css.actions}>
            <button type='button' onClick={handleCancel} className={css.cancelButton}>Cancel</button>
            <button type='submit' className={css.saveButton}>Save user</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default EditProfile;
