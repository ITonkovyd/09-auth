"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { User } from "@/types/user";
import css from "./EditProfilePage.module.css";

const EditProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMe().then((user) => {
      setUser(user);
      console.log(user);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, username: event.target.value } as User);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updatedUser = await updateMe({ username: user?.username });
      useAuthStore.getState().setUser(updatedUser);

      router.push("/profile");
    } catch (error) {
      console.error("Oops, some error:", error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <section className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit profile</h1>
        <AvatarPicker profilePhotoUrl={user?.avatar} />
        <div className={css.emailWrapper}>
          <span className={css.emailLabel}>Email</span>
          <span>{user?.email}</span>
        </div>
        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="userName">Username</label>
            <input
              id="userName"
              type="text"
              value={user?.username || ""}
              onChange={handleChange}
              className={css.input}
              placeholder="Enter your username"
            />
          </div>
          <div className={css.actions}>
            <button
              type="button"
              onClick={handleCancel}
              className={css.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={css.saveButton}>
              Save user
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
