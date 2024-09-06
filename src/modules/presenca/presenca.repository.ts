import { Prisma, PrismaClient } from "@prisma/client";
import DatabaseService from "src/database/database.service";
import { NotFoundException } from "@nestjs/common";
import CreatePresencaDto from "./dto/create-presenca.dto";
import { IPresenca } from "src/shared/interfaces/presenca.interface";
import UpdatePresencaDto from "./dto/update-presenca.dto";

export default class PresencaRepository {
    async create(presenca: CreatePresencaDto) {
        const prisma: PrismaClient = DatabaseService.getInstance();
        const createdPresenca = await prisma.presenca.create({
            data: {
                eventoId: presenca.eventoId,
                pessoaId: presenca.pessoaId,
                dataPresenca: presenca.dataPresenca,
                horaPresenca: presenca.horaPresenca,
            },
        });

        return createdPresenca;
    }

    async findAll() {
        const prisma: PrismaClient = DatabaseService.getInstance();

        const presencas: Partial<IPresenca>[] = await prisma.presenca.findMany({
            select: {
                id: true,
                dataPresenca: true,
                horaPresenca: true,
                evento: {
                    select: {
                        nome: true,
                    },
                },
                pessoa: {
                    select: {
                        nome: true,
                        codigo: true,
                    },
                },
            },
        });

        return presencas;
    }

    async findOneById(id: number) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        const presenca: Partial<IPresenca> = await prisma.presenca.findUnique({
            where: { id },
            select: {
                id: true,
                dataPresenca: true,
                horaPresenca: true,
                evento: {
                    select: {
                        nome: true,
                    },
                },
                pessoa: {
                    select: {
                        nome: true,
                        codigo: true,
                    },
                },
            },
        });

        if (!presenca) {
            throw new NotFoundException("presenca nao existe");
        }

        return presenca;
    }

    async update(id: number, presenca: UpdatePresencaDto) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        try {
            const updatedPresenca: IPresenca = await prisma.presenca.update({
                where: { id },
                data: {
                    eventoId: presenca.eventoId,
                    pessoaId: presenca.pessoaId,
                    dataPresenca: presenca.dataPresenca,
                    horaPresenca: presenca.horaPresenca,
                },
            });

            return updatedPresenca;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                throw new NotFoundException("presenca nao existe");
            }
        }
    }

    async remove(id: number) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        try {
            const deletedPresenca = await prisma.presenca.delete({
                where: { id },
            });

            return deletedPresenca;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                throw new NotFoundException("presenca nao existe");
            }
        }
    }
}
