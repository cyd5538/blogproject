"use client"
import { create } from 'zustand';

interface DarkModeStore {
    isOpen : boolean;
    onOpen : () => void;
    onClose : () => void;
}

const useDarkMode = create<DarkModeStore>((set) => ({
    isOpen: typeof window !== 'undefined' && localStorage && localStorage.getItem('darkMode') === 'true' ? true : false,
    onOpen : () => set({ isOpen: true}),
    onClose : () => set({ isOpen: false})
}));

export default useDarkMode;