import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNote, deleteNoteById, getNotes, updateNoteById } from "./notesAPI";
import { NotesSchemaType } from "@/validators/NotesSchema";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  notes: [],
  addNoteLoading: false,
  notesLoading: false,
  updateLoading: false,
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

export const updateNoteByIdAsync = createAsyncThunk(
  "notes/updateNote",
  async ({ id, noteData }: { id: string; noteData: any }) => {
    const response = await updateNoteById(id, noteData);
    return response;
  }
);

export const deleteNoteByIdAsync = createAsyncThunk(
  "notes/deleteNote",
  async (id: string) => {
    const response = await deleteNoteById(id);
    return response;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    resetNotes(state) {
      return initialState;
    },
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
      .addCase(updateNoteByIdAsync.pending, (state, action) => {
        state.updateLoading = true;
      })
      .addCase(updateNoteByIdAsync.fulfilled, (state, action) => {
        state.updateLoading = false;
        if (action.payload.success) {
          // @ts-ignore
          state.notes = state.notes.map((note: any): any => {
            if (note._id === action.payload.note._id) {
              return action.payload.note;
            }
            return note;
          });
        }
      })
      .addCase(updateNoteByIdAsync.rejected, (state, action) => {
        state.updateLoading = false;
      })
      .addCase(deleteNoteByIdAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          // @ts-ignore
          state.notes = state.notes.filter((note: any): any => {
            if (note._id !== action.payload.noteId) {
              return note;
            }
          });
        }
      });
  },
});
export const { resetNotes } = notesSlice.actions;
export const selectNotes = (state: any) => state.notes.notes;
export const selectUpdateLoading = (state: any) => state.notes.updateLoading;

export default notesSlice.reducer;
