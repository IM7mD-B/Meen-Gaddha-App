import { create } from 'zustand';

const useGameSettingsStore = create((set) => ({
  // ====== STATE ======
  gameName: '',
  teamName1: '',
  teamName2: '',
  questionsCount: null,
  selectedCategory: [],

  // ====== ACTIONS ======
  setGameName: (name) => set({ gameName: name }),

  setTeamName1: (name) => set({ teamName1: name }),

  setTeamName2: (name) => set({ teamName2: name }),

  setQuestionsCount: (count) => set({ questionsCount: count }),

  setSelectedCategory: (categories) =>
    set({ selectedCategory: categories }),

  // ====== RESET ======
  resetGameSettings: () =>
    set({
      gameName: '',
      teamName1: '',
      teamName2: '',
      questionsCount: null,
      selectedCategory: [],
    }),
}));

export default useGameSettingsStore;
