import { Gym, Prisma } from '@prisma/client'

export interface FindManyByNearby {
  latitude: number
  longitude: number
}

export interface GymRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyByNearby(params: FindManyByNearby): Promise<Gym[]>
  findById(id: string): Promise<Gym | null>
}
