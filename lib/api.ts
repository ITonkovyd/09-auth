import axios from "axios";
import type { Note, BaseNoteParams } from "@/types/note.ts";


const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: false,
});

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