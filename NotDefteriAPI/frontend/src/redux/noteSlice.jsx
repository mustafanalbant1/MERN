import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        items: [],
        filteredNotes: [],
        selectedColor: '',
        setUpdateNote: false,
        updateNoteData: { id: '', title: '', content: '', color: '' },
        loading: false,
        error: null,
    },
    reducers: {
        addNote: (state, action) => {
            state.items.push(action.payload);
        },
        removeNote: (state, action) => {
            state.items = state.items.filter(note => note.id !== action.payload);
        },
        setItems: (state, action) => {
            state.items = action.payload;
            state.loading = false;
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setSelectedColor: (state, action) => {
            state.selectedColor = action.payload;
        },
        searchNote: (state, action) => {
            const searchValue = action.payload.toLowerCase();
            state.filteredNotes = state.items.filter(note =>
                note.title.toLowerCase().includes(searchValue) ||
                note.content.toLowerCase().includes(searchValue)
            );
        },
        setUpdateNote: (state, action) => {
            state.setUpdateNote = action.payload;
        },
        setEditNoteData: (state, action) => {
            // Mevcut verileri kaybetmeden, yalnızca güncel veriyi güncelleyerek state'i güncelle
            state.updateNoteData = {
                ...state.updateNoteData,
                ...action.payload
            };
        },
    },
});


export const {
    addNote,
    removeNote,
    setItems,
    setLoading,
    setError,
    setSelectedColor,
    searchNote,
    setUpdateNote,
    setEditNoteData,

} = notesSlice.actions;

export default notesSlice.reducer;
