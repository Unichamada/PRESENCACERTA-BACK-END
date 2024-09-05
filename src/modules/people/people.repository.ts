import { Prisma, PrismaClient } from "@prisma/client";
import { CreatePeopleDto } from "./dto/create-people.dto";
import { UpdatePeopleDto } from "./dto/update-people.dto";
import DatabaseService from "src/database/database.service";
import { NotFoundException, ConflictException } from "@nestjs/common";
import { IPeople } from "src/shared/interfaces/people.interface";

// TODO: Corrigir data

export default class PeopleRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = DatabaseService.getInstance();
    }

    async create(createPeopleDto: CreatePeopleDto): Promise<IPeople> {
        try {
            const createdPerson = await this.prisma.pessoa.create({
                data: {
                    codigo: createPeopleDto.codigo,
                    nome: createPeopleDto.nome,
                    cpf: createPeopleDto.cpf,
                    tipoId: createPeopleDto.tipoId ?? null,
                    unidadeId: createPeopleDto.unidadeId ?? null,
                    usuarioId: createPeopleDto.usuarioId ?? null,
                },
            });

            return createdPerson;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new ConflictException("Essa pessoa já está cadastrada");
            }

            throw error;
        }
    }

    async findAll(): Promise<IPeople[]> {
        return this.prisma.pessoa.findMany({
            select: {
                id: true,
                codigo: true,
                nome: true,
                cpf: true,
                tipoId: true,
                unidadeId: true,
                usuarioId: true,
            },
        });
    }

    async findByCode(code: string): Promise<IPeople> {
        const person = await this.prisma.pessoa.findFirst({
            where: { codigo: code },
            include: {
                tipo: true,
                unidade: true,
                usuario: true,
                turmas: true,
                materias: true,
                presencas: true,
            },
        });

        if (!person) {
            throw new NotFoundException(
                `Aluno com a matrícula ${code} não encontrado`,
            );
        }

        return person;
    }

    async findOneById(id: number): Promise<IPeople> {
        const person = await this.prisma.pessoa.findUnique({
            where: { id },
            include: {
                tipo: true,
                unidade: true,
                usuario: true,
                turmas: true,
                materias: true,
                presencas: true,
            },
        });

        if (!person) {
            throw new NotFoundException("Pessoa não encontrada");
        }

        return person;
    }

    async update(
        id: number,
        updatePeopleDto: UpdatePeopleDto,
    ): Promise<IPeople> {
        try {
            const updatedPerson = await this.prisma.pessoa.update({
                where: { id },
                data: {
                    codigo: updatePeopleDto.codigo,
                    nome: updatePeopleDto.nome,
                    cpf: updatePeopleDto.cpf,
                    tipoId: updatePeopleDto.tipoId ?? null,
                    unidadeId: updatePeopleDto.unidadeId ?? null,
                    usuarioId: updatePeopleDto.usuarioId ?? null,
                },
            });

            return updatedPerson;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new ConflictException(
                    "Erro de conflito ao alterar a pessoa",
                );
            }

            throw error;
        }
    }

    async remove(id: number): Promise<IPeople> {
        try {
            const deletedPerson = await this.prisma.pessoa.delete({
                where: { id },
            });

            return deletedPerson;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                throw new NotFoundException("Pessoa não encontrada");
            }

            throw error;
        }
    }
}
