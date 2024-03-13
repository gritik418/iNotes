import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNote, getNoteById, getNotes } from "./notesAPI";
import { NotesSchemaType } from "@/validators/NotesSchema";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  notes: [],
  noteById: {},
  addNoteLoading: false,
  notesLoading: false,
};

export const addNotesAsync = createAsyncThunk(
  "notes/addNotes",
  async (noteData: NotesSchemaType) => {
    const response = await addNote(noteData);
    return response;
  }
);

export const getNotesAsync = createAsyncThunk("notes/getNotes", async () => {
  const response = await getNotes();
  return response;
});

export const getNoteByIdAsync = createAsyncThunk(
  "notes/getNoteById",
  async (id: string) => {
    const response = await getNoteById(id);
    return response;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // addToNotes: (state, action: any) => {
    //   state.notes.unshift(action.payload as never);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNotesAsync.pending, (state, action) => {
        state.addNoteLoading = true;
      })
      .addCase(addNotesAsync.fulfilled, (state, action) => {
        state.addNoteLoading = false;
        if (action.payload.success) {
          state.notes.unshift(action.payload.note as never);
          toast.success(action.payload.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          toast.error(action.payload.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      })
      .addCase(addNotesAsync.rejected, (state, action) => {
        state.addNoteLoading = false;
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .addCase(getNotesAsync.pending, (state, action) => {
        state.notesLoading = true;
      })
      .addCase(getNotesAsync.fulfilled, (state, action) => {
        state.notesLoading = false;
        if (action.payload.success) {
          state.notes = action.payload.notes;
        }
      })
      .addCase(getNotesAsync.rejected, (state, action) => {
        state.notesLoading = false;
      })
      .addCase(getNoteByIdAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.noteById = action.payload.note;
        }
      });
  },
});

export const selectNotes = (state: any) => state.notes.notes;
export const selectNoteById = (state: any) => state.notes.noteById;

export default notesSlice.reducer;
