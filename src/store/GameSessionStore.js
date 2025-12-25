import { create } from 'zustand';

const useGameSessionStore = create(set => ({
  groupId: null,
  isGameActive: false,

  startSession: (groupId) =>
    set({
      groupId,
      isGameActive: true,
    }),

  endSession: () =>
    set({
      groupId: null,
      isGameActive: false,
    }),
}));

export default useGameSessionStore;