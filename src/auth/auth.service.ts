import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignupDto, SigninDto } from "./dto";
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ForbiddenException } from "@nestjs/common/exceptions";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

    async signup(dto: SignupDto) {
        const hash = await argon.hash(dto.password)

        console.log(dto)

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    fullName: dto.fullName,
                    phone: dto.phone,
                    city: {
                        connectOrCreate: {
                            where: {
                                name: dto.city
                            },
                            create: {
                                name: dto.city
                            }
                        }
                    },
                    pointOfDate: dto.pointOfDate,
                    familyStatus: dto.familyStatus,
                    info: dto.info,
                    avatar: '',
                    children: dto.children,
                    sex: dto.sex,
                    hash,
                    lat: dto.lat,
                    lon: dto.lon,
                }
            })
    
            return this.signToken(user.id, user.email)
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === 'P2002') throw new ForbiddenException('Credentials taken')
            }
        }
    }

    async uploadAvatar(userId, filename) {
        const user = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                avatar: filename,
                
            }
        })
    
        return this.signToken(user.id, user.email)
    }

    async signin(dto: SigninDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user) throw new ForbiddenException('Credentials incorrect')

        const pwMatches = await argon.verify(user.hash, dto.password)

        if (!pwMatches) throw new ForbiddenException('Credentials incorrect')

        return this.signToken(user.id, user.email)

    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }

        const secret = this.config.get<string>('JWT_SECRET')
        const token = await this.jwt.signAsync(payload, {expiresIn: '15m',secret})

        return ({
            access_token: token
        })
    }
}