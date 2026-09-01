import { create } from '../lib/zustand.js';
import { MOCK_PATIENT_QUEUE } from '../data/mockPatients.js';

export const useDoctorStore = create((set) => ({
  patients: MOCK_PATIENT_QUEUE,
  selectedPatientId: 'P-101',
  filterRedFlagsOnly: false,
  searchQuery: '',
  doctorNotes: '',

  setSelectedPatientId: (id) => set({ selectedPatientId: id }),
  setFilterRedFlagsOnly: (flag) => set({ filterRedFlagsOnly: flag }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setDoctorNotes: (notes) => set({ doctorNotes: notes }),

  approveClinicalReview: (patientId) => set((state) => ({
    patients: state.patients.map((p) => 
      p.id === patientId ? { ...p, status: 'Clinical Review Completed' } : p
    )
  }))
}));
