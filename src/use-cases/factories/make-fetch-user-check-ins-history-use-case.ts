import { FetchUserMemberCheckInsUseCase } from '../fech-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserMemberCheckInsUseCase(checkInsRepository)

  return useCase
}
