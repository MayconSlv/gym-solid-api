import { Checkin, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../checkin-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkIn = await prisma.checkin.create({
      data,
    })

    return checkIn
  }

  async save(data: Checkin) {
    const checkIn = await prisma.checkin.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkIn
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkin.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  async findById(id: string) {
    const checkIn = await prisma.checkin.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkin.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIns
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfSameDay = dayjs(date).startOf('date')
    const endOfSameDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkin.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfSameDay.toDate(),
          lte: endOfSameDay.toDate(),
        },
      },
    })

    return checkIn
  }
}
