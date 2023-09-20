import { Checkin } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkin-repository'

interface FechUserMemberCheckInsUseCaseRequest {
  userId: string
  page: number
}

interface FechUserMemberCheckInsUseCaseResponse {
  checkIns: Checkin[]
}

export class FetchUserMemberCheckInsUseCase {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FechUserMemberCheckInsUseCaseRequest): Promise<FechUserMemberCheckInsUseCaseResponse> {
    const checkIns = await this.checkinsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
