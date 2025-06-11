import { User, Child, VaccinationRecord, MedicalHistory, GrowthRecord, DoctorVisit } from '@/types'

type DbSchema = {
  users: User[]
  children: Child[]
  vaccinations: VaccinationRecord[]
  medicalHistory: MedicalHistory[]
  growthRecords: GrowthRecord[]
  doctorVisits: DoctorVisit[]
}

class MockDatabase {
  private static instance: MockDatabase
  private data: DbSchema

  private constructor() {
    // Initialize with empty collections
    this.data = {
      users: [],
      children: [],
      vaccinations: [],
      medicalHistory: [],
      growthRecords: [],
      doctorVisits: []
    }

    // Load data from localStorage if available
    this.loadFromStorage()
  }

  public static getInstance(): MockDatabase {
    if (!MockDatabase.instance) {
      MockDatabase.instance = new MockDatabase()
    }
    return MockDatabase.instance
  }

  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('malezi_db')
      if (storedData) {
        this.data = JSON.parse(storedData)
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('malezi_db', JSON.stringify(this.data))
    }
  }

  // Generic CRUD operations
  public async create<T extends keyof DbSchema>(
    collection: T,
    data: Omit<DbSchema[T][number], 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<DbSchema[T][number]> {
    const newItem = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    } as DbSchema[T][number]
//@ts-ignore
    this.data[collection].push(newItem)
    this.saveToStorage()
    return newItem
  }

  public async findMany<T extends keyof DbSchema>(
    collection: T,
    query?: Partial<DbSchema[T][number]>
  ): Promise<DbSchema[T][number][]> {
    if (!query) return this.data[collection]

    return this.data[collection].filter(item =>
      Object.entries(query).every(([key, value]) => item[key as keyof typeof item] === value)
    )
  }

  public async findUnique<T extends keyof DbSchema>(
    collection: T,
    query: Partial<DbSchema[T][number]>
  ): Promise<DbSchema[T][number] | null> {
    const result = this.data[collection].find(item =>
      Object.entries(query).every(([key, value]) => item[key as keyof typeof item] === value)
    )
    return result || null
  }

  public async update<T extends keyof DbSchema>(
    collection: T,
    id: string,
    data: Partial<DbSchema[T][number]>
  ): Promise<DbSchema[T][number]> {
    const index = this.data[collection].findIndex(item => item.id === id)
    if (index === -1) throw new Error('Item not found')

    const updatedItem = {
      ...this.data[collection][index],
      ...data,
      updatedAt: new Date()
    }

    this.data[collection][index] = updatedItem
    this.saveToStorage()
    return updatedItem
  }

  public async delete<T extends keyof DbSchema>(collection: T, id: string): Promise<void> {
    const index = this.data[collection].findIndex(item => item.id === id)
    if (index === -1) throw new Error('Item not found')

    this.data[collection].splice(index, 1)
    this.saveToStorage()
  }
}

export const db = MockDatabase.getInstance()