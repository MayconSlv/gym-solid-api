import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    // sut = system under test

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Academia Javascript',
      description: '',
      phone: '',
      latitude: new Decimal(-8.0966109),
      longitude: new Decimal(-34.8941198),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: -8.0966109,
      userLongitude: -34.8941198,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: -8.0966109,
      userLongitude: -34.8941198,
    })

    expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-id',
        userLatitude: -8.0966109,
        userLongitude: -34.8941198,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: -8.0966109,
      userLongitude: -34.8941198,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: -8.0966109,
      userLongitude: -34.8941198,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Academia Javascript',
      description: '',
      phone: '',
      latitude: new Decimal(-8.1136481),
      longitude: new Decimal(-34.8942485),
    })

    expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-id',
        userLatitude: -8.0966109,
        userLongitude: -34.8941198,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
