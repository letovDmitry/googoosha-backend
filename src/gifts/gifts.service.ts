import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GiftsService {
    constructor(private prisma: PrismaService) {}

    async getGifts() {
        return this.prisma.gift.findMany({})
    }

    async createGift(dto: any) {
        return this.prisma.gift.create({
            data: {
                cost: dto.cost,
                img: '',
                name: dto.name
            }
        })
    }

    async uploadGiftImage(giftId, filename) {
        const gift = await this.prisma.gift.update({
            where: {
                id: giftId
            },
            data: {
                img: filename,
            }
        })
    
        return gift
    }

    async sendGift(giftId: number, userId: number, userToId: number) {
        const gift = await this.prisma.gift.findUnique({
            where: {
                id: giftId
            }
        })

        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (user.balance < gift.cost) {
            return {
                error: "Not enough money"
            }
        }

        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                balance: (user.balance - gift.cost)
            }
        })

        return await this.prisma.user.update({
            where: {
                id: userToId
            },
            data: {
                gifts: {
                    connect: {
                        id: giftId
                    }
                }
            }
        })
    }
}
