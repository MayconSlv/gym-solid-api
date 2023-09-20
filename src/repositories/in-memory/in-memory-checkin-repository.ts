import { Checkin, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../checkin-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: Checkin[] = []

  async countByUserId(userId: string) {
    return this.items.filter((items) => items.user_id === userId).length
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfSameDay = dayjs(date).startOf('date')
    const endOfSameDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((checkin) => {
      const checkInDate = dayjs(checkin.created_at)
      const onSameDate =
        checkInDate.isAfter(startOfSameDay) &&
        checkInDate.isBefore(endOfSameDay)

      return checkin.user_id === userId && onSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((items) => items.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
