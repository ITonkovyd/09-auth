'use client';

import Image from 'next/image';
import css from './EditProfilePage.module.css';

type Props = {
  profilePhotoUrl?: string;
};

const AvatarPicker = ({ profilePhotoUrl }: Props) => {
  return (
    <div className={css.picker}>
      {profilePhotoUrl && (
        <Image
          src={profilePhotoUrl}
          alt="Profile Avatar"
          width={300}
          height={300}
          className={css.avatar}
        />
      )}
    </div>
  );
};

export default AvatarPicker;
