// stores/useEditorStore.ts
import { create } from "zustand";

type BackgroundType = "solid";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
}

interface EditorState {
  username: string;
  bio: string;
  profileImage: string | null;

  backgroundType: BackgroundType;
  backgroundColor: string;
  backgroundImage: string | null;
  pattern: string | null;

  theme: string;
  iconStyle: string;

  links: LinkItem[];

  setUsername: (name: string) => void;
  setBio: (bio: string) => void;
  setProfileImage: (img: string | null) => void;

  setBackground: (type: BackgroundType, value: string | null) => void;
  setTheme: (theme: string) => void;
  setIconStyle: (style: string) => void;

  addLink: (link: LinkItem) => void;
  updateLink: (id: string, updated: Partial<LinkItem>) => void;
  removeLink: (id: string) => void;
  setLinks: (links: LinkItem[]) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  username: "yourname",
  bio: "Welcome to my link page!",
  profileImage: null,

  backgroundType: "solid",
  backgroundColor: "#ffffff",
  backgroundImage: null,
  pattern: null,

  theme: "brown",
  iconStyle: "rounded-filled",

  links: [],

  setUsername: (username) => set({ username }),
  setBio: (bio) => set({ bio }),
  setProfileImage: (img) => set({ profileImage: img }),

  setBackground: (type, value) =>
    set((state) => {
      if (type === "solid") return { backgroundType: type, backgroundColor: value || "#ffffff" };

      return state;
    }),

  setTheme: (theme) => set({ theme }),
  setIconStyle: (style) => set({ iconStyle: style }),

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
