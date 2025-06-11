export interface User {
  id: string
  email: string
  name: string
  role: 'parent' | 'medical_staff'
  createdAt: Date
  updatedAt: Date
}

export interface Child {
  id: string
  name: string
  dateOfBirth: Date
  gender: 'male' | 'female' | 'other'
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  parentId: string
  createdAt: Date
  updatedAt: Date
}

export interface VaccinationRecord {
  id: string
  childId: string
  vaccineName: string
  dateAdministered: Date
  nextDueDate?: Date
  administeredBy: string
  batchNumber: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface MedicalHistory {
  id: string
  childId: string
  condition: string
  diagnosisDate: Date
  status: 'active' | 'resolved' | 'ongoing'
  notes: string
  createdAt: Date
  updatedAt: Date
}

export interface GrowthRecord {
  id: string
  childId: string
  date: Date
  height: number // in centimeters
  weight: number // in kilograms
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface DoctorVisit {
  id: string
  childId: string
  date: Date
  doctorName: string
  reason: string
  diagnosis?: string
  prescription?: string
  followUpDate?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}