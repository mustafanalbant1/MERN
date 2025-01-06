import axios from 'axios';
import { addNote, removeNote, setItems, setLoading, setError, setSelectedColor, setEditNoteData, } from './noteSlice';

// Fetch all notes (Read)
export const fetchNotes = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await axios.get('http://localhost:8000/api/notes');
        dispatch(setItems(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

// Remove a note by ID (Delete)
export const removeNoteAsync = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:8000/api/notes/${id}`);
        dispatch(removeNote(id));
    } catch (error) {
        console.error('Not silinirken hata oluştu:', error);
    }
};



// Add a new note (Create)
export const addNoteAsync = (noteData) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await axios.post('http://localhost:8000/api/notes', noteData);
        dispatch(addNote(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

// Not güncelleme işlemi
export const updateNoteAsync = (updatedNote) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await axios.put(`http://localhost:8000/api/notes/${updatedNote.id}`, updatedNote);
        dispatch(setEditNoteData(response.data)); // Güncellenmiş veriyi Redux'a kaydet
    } catch (error) {
        dispatch(setError(error.message));
    }
};



export { addNote, removeNote, setItems, setLoading, setError, setSelectedColor };
