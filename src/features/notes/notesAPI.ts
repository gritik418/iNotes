import { NotesSchemaType } from "@/validators/NotesSchema";
import axios from "axios";

export const addNote = async (noteData: NotesSchemaType) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/notes`,
      noteData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getNotes = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/notes`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateNoteById = async (id: string, noteData: any) => {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/notes/${id}`,
      noteData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const deleteNoteById = async (id: string) => {
  try {
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/notes/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
