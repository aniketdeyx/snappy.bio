// stores/useEditorStore.ts
import { create } from "zustand";

interface LinkItem {
  id: string;
  label: string;
  url: string;
  icon: string;
}

interface EditorState {
  username: string;
  bio: string;
  profileImage: string | null;
  backgroundColor: string;
  links: LinkItem[];

  setUsername: (name: string) => void;
  setBio: (bio: string) => void;
  setProfileImage: (img: string | null) => void;
  setBackgroundColor: (color: string) => void;

  addLink: (link: LinkItem) => void;
  updateLink: (id: string, updated: Partial<LinkItem>) => void;
  removeLink: (id: string) => void;
  setLinks: (links: LinkItem[]) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  username: "",
  bio: "",
  profileImage: null,
  backgroundColor: "#ffffff",
  links: [],

  setUsername: (username) => set({ username }),
  setBio: (bio) => set({ bio }),
  setProfileImage: (img) => set({ profileImage: img }),
  setBackgroundColor: (color) => set({ backgroundColor: color }),

  addLink: (link) => set((state) => ({ links: [...state.links, link] })),
  updateLink: (id, updated) =>
    set((state) => ({
      links: state.links.map((l) => (l.id === id ? { ...l, ...updated } : l)),
    })),
  removeLink: (id) =>
    set((state) => ({
      links: state.links.filter((l) => l.id !== id),
    })),
  setLinks: (links) => set({ links }),
}));


// store/authStore.ts

interface AuthState {
  user: null | { email: string }; // expand as needed
  isLoading: boolean;
  setUser: (user: any) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => {
    set({ user });
    // Store user in localStorage for persistence
    if (user) {
      localStorage.setItem('snappy_user', JSON.stringify(user));
    }
  },
  clearUser: () => {
    set({ user: null });
    localStorage.removeItem('snappy_user');
  },
  setLoading: (loading) => set({ isLoading: loading }),
  checkAuth: async () => {
    set({ isLoading: true });
    try {
      // First check localStorage for existing user
      const storedUser = localStorage.getItem('snappy_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        
        // Verify the session is still valid with the backend
        const apiUrl = import.meta.env.PROD ? '/api/auth/verify' : 'http://localhost:3000/api/auth/verify';
        const response = await fetch(apiUrl, {
          credentials: 'include',
        });
        
        if (response.ok) {
          set({ user: userData, isLoading: false });
        } else {
          // Session expired, clear stored data
          localStorage.removeItem('snappy_user');
          set({ user: null, isLoading: false });
        }
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('snappy_user');
      set({ user: null, isLoading: false });
    }
  },
}));
