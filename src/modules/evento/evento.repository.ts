import { Prisma, PrismaClient } from "@prisma/client";
import DatabaseService from "src/database/database.service";
import { NotFoundException } from "@nestjs/common";
import CreateEventoDto from "./dto/create-evento.dto";
import { IEvento } from "src/shared/interfaces/evento.interface";
import UpdateEventoDto from "./dto/update-evento.dto";

export default class EventoRepository {
    async create(evento: CreateEventoDto) {
        const prisma: PrismaClient = DatabaseService.getInstance();
        const createdEvento = await prisma.evento.create({
            data: {
                nome: evento.nome,
                dataInicio: evento.dataInicio,
                dataFim: evento.dataFim,
                horaInicio: evento.horaInicio,
                horaFim: evento.horaFim,
            },
        });

        return createdEvento;
    }

    async findAll() {
        const prisma: PrismaClient = DatabaseService.getInstance();

        const eventos: Partial<IEvento>[] = await prisma.evento.findMany({
            select: {
                id: true,
                nome: true,
            },
        });

        return eventos;
    }

    async findOneById(id: number) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        const evento: Partial<IEvento> = await prisma.evento.findUnique({
            where: { id },
            select: {
                id: true,
                nome: true,
            },
        });

        if (!evento) {
            throw new NotFoundException("evento nao existe");
        }

        return evento;
    }

    async update(id: number, evento: UpdateEventoDto) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        try {
            const updatedEvento: IEvento = await prisma.evento.update({
                where: { id },
                data: {
                    nome: evento.nome,
                    dataInicio: evento.dataInicio,
                    dataFim: evento.dataFim,
                    horaInicio: evento.horaInicio,
                    horaFim: evento.horaFim,
                },
            });

            return updatedEvento;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                throw new NotFoundException("evento nao existe");
            }
        }
    }

    async remove(id: number) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        try {
            const deletedEvento = await prisma.evento.delete({
                where: { id },
            });

            return deletedEvento;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                throw new NotFoundException("evento nao existe");
            }
        }
    }
}
