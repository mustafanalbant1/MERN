import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './noteSlice'; // Tek bir dilime indirgenmiş hali

export const store = configureStore({
    reducer: {
        notes: notesReducer,
    },
});
