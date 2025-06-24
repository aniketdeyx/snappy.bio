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
  setUser: (user: any) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
