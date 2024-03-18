import { create } from 'zustand'

export type CallCreateModal = {
  status: boolean;
  setStatus: (value:boolean) => void;
}

export const useCallCreateModal = create<CallCreateModal>((set) => ({
  status : false,
  setStatus: (value:boolean) => set({status: value })
}))