import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MatchingService {
    constructor(private prisma: PrismaService) {}
 
    async findPair(userId: number, queryParams) {
        const { sex, children, cityName, pointOfDate } = queryParams

        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                likesFrom: true,
                likesFromRelation: true
            }
        })
        const userLikesFrom = user.likesFrom.map(u => u.id)
        const userLikesFromRelation = user.likesFromRelation.map(u => u.id)
        if (pointOfDate) {
            const users = await this.prisma.user.findMany({
                where: {
                    NOT: {
                        id: userId
                    },
    
                    children: children ? children : {},
                    sex: sex ? sex == 'true' ? true : false : {},
                    cityName: cityName ? cityName : {},
                    pointOfDate: { hasEvery: pointOfDate }
    
                }
            })
            return users.filter(u => !userLikesFrom.includes(u.id) && !userLikesFromRelation.includes(u.id))
        } else {
            const users = await this.prisma.user.findMany({
                where: {
                    NOT: {
                        id: userId
                    },
    
                    children: children ? children : {},
                    sex: sex ? sex == 'true' ? true : false : {},
                    cityName: cityName ? cityName : {},
                }
            })

            return users.filter(u => !userLikesFrom.includes(u.id) && !userLikesFromRelation.includes(u.id))
        }
    }

    async getUser(userId: number, userToFindId: number) {
        await this.prisma.user.update({
            where: {
                id: userToFindId
            },
            data: {
                guests: {
                    connect: {
                        id: userId
                    }
                }
            }
        })

        return await this.prisma.user.findUnique({
            where: {
                id: userToFindId
            }
        })
    }

    async sendLike(userId: number, userToId: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                likesFrom: true
            }
        })

        if (user.likesFrom.map(u => u.id).includes(userToId)) {
            await this.prisma.user.update({
                where: {
                    id: userToId
                },
                data: {
                    likesFrom: {
                        connect: {
                            id: userId
                        }
                    },
                    friends: {
                        connect: {
                            id: userId
                        }
                    }
                }
            })

            await this.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    friends: {
                        connect: {
                            id: userToId
                        }
                    }
                }
            })
        } else {
            return await this.prisma.user.update({
                where: {
                    id: userToId
                },
                data: {
                    likesFrom: {
                        connect: {
                            id: userId
                        }
                    }
                }
            })
        }

      
    }

    async getLikesFrom(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                likesFrom: true,
                friends: true
            },
        })

        const userFriendsIds = user.friends.map(u => u.id)

        return user.likesFrom.filter(u => !userFriendsIds.includes(u.id))
    }

    async getLikesTo(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                likesFromRelation: true,
                friends: true
            },
        })

        const userFriendsIds = user.friends.map(u => u.id)

        return user.likesFromRelation.filter(u => !userFriendsIds.includes(u.id))
    }

    async getFriends(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                friends: true
            },
        })

        return user.friends
    }

    
    async removeFromFriends(userId, userToRemoveId) {
        await this.prisma.user.update({
            where: {
                id: userToRemoveId
            },
            data: {
                likesFrom: {
                    disconnect: {
                        id: userId
                    }
                }
            }
        })
    
        return await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                friends: {
                    disconnect: {
                        id: userToRemoveId
                    }
                },
                likesFromRelation: {
                    disconnect: {
                        id: userToRemoveId
                    }
                }
            }
        })
    }

    
    async getGuests(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                guests: true
            },
        })

        return user.guests
    }
}
