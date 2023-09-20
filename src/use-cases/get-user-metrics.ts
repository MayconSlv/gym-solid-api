import { CheckInsRepository } from '@/repositories/checkin-repository'

interface GetUserMetricsUseCaseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseCaseRequest): Promise<GetUserMetricsUseCaseCaseResponse> {
    const checkInsCount = await this.checkinsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
