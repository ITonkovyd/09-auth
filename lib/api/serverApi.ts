import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import { User } from "@/types/user";
import { instance } from "./api";

interface FetchNotesResponse {
  totalPages: number;
  notes: Note[];
}

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await instance.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await instance.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchServerNotes = async (
  page: number,
  query: string | null = null,
  tag: string | null = null
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const res = await instance.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      ...(query && { search: query }),
      ...(tag && { tag }),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const fetchServerNoteById = async (noteId: string): Promise<Note> => {
  const cookieStore = await cookies();
  const res = await instance.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};
