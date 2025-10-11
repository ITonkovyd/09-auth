import type { Note, BaseNoteParams } from "@/types/note.ts";
import { instance } from "../api";
import { AuthRequest, User } from "@/types/user";

export interface ApiError {
  message: string;
  response?: {
    data: {
      error: string;
    };
  };
}

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await instance.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

interface fetchNotesResponse {
  totalPages: number;
  notes: Note[];
}

export const fetchNotes = async (
  page: number,
  query: string | null = null,
  tag: string | null = null
): Promise<fetchNotesResponse> => {
  const res = await instance.get<fetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      ...(query && { search: query }),
      ...(tag && { tag }),
    },
  });
  return res.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const res = await instance.get<Note>(`/notes/${noteId}`);
  return res.data;
};

export const createNote = async (newNote: BaseNoteParams): Promise<Note> => {
  const res = await instance.post<Note>("/notes", newNote);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await instance.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const register = async (data: AuthRequest) => {
  const res = await instance.post<User>("/auth/register", data);
  return res.data;
}

export const login = async (data: AuthRequest) => {
  const res = await instance.post<User>('/auth/login', data);
  return res.data;
};

export const getMe = async () => {
  const { data } = await instance.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await instance.post('/auth/logout')
};