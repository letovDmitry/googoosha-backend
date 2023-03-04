import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async uploadAvatar(userId, filename) {
        const user = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                avatar: filename,
                
            }
        })
    
        return user
    }

    async getCities() {
        return this.prisma.city.findMany()
    }
}