import { Checkin } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkin-repository'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckinUseCaseResponse {
  checkIn: Checkin
}

export class CheckInUseCase {
  constructor(private checkinRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const checkInOnSameDate = await this.checkinRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new Error()
    }

    const checkIn = await this.checkinRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
