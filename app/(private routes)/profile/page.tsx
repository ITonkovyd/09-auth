import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getServerMe } from '@/lib/api/serverApi';
import css from './ProfilePage.module.css';

export const metadata: Metadata = {
  title: "My Profile - NoteHub",
  description: "View and manage your NoteHub profile information",
  openGraph: {
    title: "My Profile - NoteHub",
    description: "View and manage your NoteHub profile information",
    url: "https://notehub.com/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

const Profile = async () => {
  const user = await getServerMe();

  return (
    <section className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>My Profile</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>Edit profile</Link>
        </div>
        <div className={css.profileInfo}>
          {user.avatar && (
          <Image
            src={user.avatar}
            alt="Preview"
            width={300}
            height={300}
            className={css.avatar}
          />
        )}
          <div className={css.usernameWrapper}>
            <p><strong>Name:</strong> {user.username}</p>
          </div>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;