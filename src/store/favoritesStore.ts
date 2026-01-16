import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
    favorites: number[]; // Array of Field IDs
    addFavorite: (fieldId: number) => void;
    removeFavorite: (fieldId: number) => void;
    isFavorite: (fieldId: number) => boolean;
    toggleFavorite: (fieldId: number) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (fieldId) => set((state) => ({ favorites: [...state.favorites, fieldId] })),
            removeFavorite: (fieldId) => set((state) => ({ favorites: state.favorites.filter((id) => id !== fieldId) })),
            isFavorite: (fieldId) => get().favorites.includes(fieldId),
            toggleFavorite: (fieldId) => {
                const { favorites } = get();
                if (favorites.includes(fieldId)) {
                    set({ favorites: favorites.filter((id) => id !== fieldId) });
                } else {
                    set({ favorites: [...favorites, fieldId] });
                }
            },
        }),
        {
            name: 'favorites-storage', // name of the item in the storage (must be unique)
        }
    )
);
