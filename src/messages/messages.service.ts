import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MessagesService {
    constructor(private prisma: PrismaService) {}

    async createChat(user1Id: number, user2Id: number) {
        const chat = await this.prisma.chat.findFirst({
            where: {
                OR: [
                    { user1Id, user2Id },
                    { user1Id: user2Id, user2Id: user1Id },
                    
                ]
            }
        })
        if (!chat) {
            return await this.prisma.chat.create({
                data: {
                    user1: {
                        connect: {
                            id: user1Id
                        }
                    },
                    user2: {
                        connect: {
                            id: user2Id
                        }
                    }
                }
            })
        } else {
            return { exists: true }
        }
    }
    
    async getChats(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                user1Chats: {
                    select: {
                        id: true,
                        user1: true,
                        user2: true,
                        messages: true
                    }
                },
                user2Chats: {
                    select: {
                        id: true,
                        user1: true,
                        user2: true,
                        messages: true
                    }
                },
            }
        })

        return user.user1Chats.concat(user.user2Chats)
    }

    async createMessage(chatId: number, senderId: number, receiverId: number, text: string) {
        return await this.prisma.chat.update({
            where: {
                id: chatId
            },
            data: {
                messages: {
                    create: {
                            text,
                            sender: {
                                connect: {
                                    id: senderId
                                }
                            },
                            receiver: {
                                connect: {
                                    id: receiverId
                                }
                            }   
                    }
                }
            }
        })
    }

    async getMessages(chatId) {
        const chat = await this.prisma.chat.findUnique({
            where: {
                id: chatId
            },
            include: {
                messages: true
            }
        })

        return chat.messages
    }
}
