import { create } from 'zustand';

interface DarkModeStore {
    isOpen : boolean;
    onOpen : () => void;
    onClose : () => void;
}

const useDarkMode = create<DarkModeStore>((set) => ({
    isOpen: localStorage && typeof localStorage !== 'undefined' && localStorage.getItem('darkMode') === 'true' ? true : false,
    onOpen : () => set({ isOpen: true}),
    onClose : () => set({ isOpen: false})
}))

export default useDarkMode;