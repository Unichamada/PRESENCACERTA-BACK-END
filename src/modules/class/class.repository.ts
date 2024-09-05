import { Prisma, PrismaClient } from "@prisma/client";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import DatabaseService from "src/database/database.service";
import { NotFoundException, ConflictException } from "@nestjs/common";
import { IClass } from "src/shared/interfaces/class.interface";

export default class ClassRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = DatabaseService.getInstance();
    }

    async create(createClassDto: CreateClassDto): Promise<IClass> {
        try {
            const createdClass = await this.prisma.turma.create({
                data: {
                    nome: createClassDto.nome,
                    unidadeId: createClassDto.unidadeId,
                },
            });

            return createdClass;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new ConflictException(
                    "Uma turma com esse nome já existe",
                );
            }

            throw error;
        }
    }

    async findAll(): Promise<IClass[]> {
        return this.prisma.turma.findMany({
            select: {
                id: true,
                nome: true,
                unidadeId: true,
            },
        });
    }

    async findOneById(id: number): Promise<IClass> {
        const classData = await this.prisma.turma.findUnique({
            where: { id },
            include: {
                unidade: true,
                eventos: true,
                pessoas: true,
                materias: true,
            },
        });

        if (!classData) {
            throw new NotFoundException("Turma não encontrada");
        }

        return classData;
    }

    async update(id: number, updateClassDto: UpdateClassDto): Promise<IClass> {
        try {
            const updatedClass = await this.prisma.turma.update({
                where: { id },
                data: {
                    nome: updateClassDto.nome,
                    unidadeId: updateClassDto.unidadeId,
                },
            });

            return updatedClass;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new ConflictException(
                    "Erro de conflito ao alterar a turma",
                );
            }

            throw error;
        }
    }

    async remove(id: number): Promise<IClass> {
        try {
            const deletedClass = await this.prisma.turma.delete({
                where: { id },
            });

            return deletedClass;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                throw new NotFoundException("Turma não encontrada");
            }
            throw error;
        }
    }
}
