import {create} from 'zustand'

export type CallCreateStepModal = {
  status: boolean;
  setStatus: (status: boolean) => void;
}

export const useCreateStepModalStore = create<CallCreateStepModal>((set) => ({
  status: false,
  setStatus: (status: boolean) => set({status}),
}))

