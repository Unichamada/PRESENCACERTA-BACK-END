import { Injectable } from "@nestjs/common";
import { CreatePeopleDto } from "./dto/create-people.dto";
import { UpdatePeopleDto } from "./dto/update-people.dto";
import PeopleRepository from "./people.repository";
import { IImportPeople } from "./interfaces/import.people.interface";
import ClassRepository from "../class/class.repository";
import { log } from "console";

@Injectable()
export class PeopleService {
    constructor(
        private readonly peopleRepository: PeopleRepository,
        private readonly turmaRepository: ClassRepository,
    ) {}

    async create(createPeopleDto: CreatePeopleDto) {
        return this.peopleRepository.create(createPeopleDto);
    }

    findAll() {
        return this.peopleRepository.findAll();
    }

    findOne(id: number) {
        return this.peopleRepository.findOneById(id);
    }

    async update(id: number, updatePeopleDto: UpdatePeopleDto) {
        return this.peopleRepository.update(id, updatePeopleDto);
    }

    remove(id: number) {
        return this.peopleRepository.remove(id);
    }

    async import(data: IImportPeople[]) {
        let count = 0;

        for (const person of data) {
            const unidadeCode = person.RA.substring(0, 2);
            const unidadeId = Number(unidadeCode);

            const pessoa = await this.peopleRepository.create({
                codigo: person.RA,
                nome: person.Nome,
            });

            const classData = await this.turmaRepository.findOrCreate({
                nome: person.Curso,
                unidadeId: unidadeId,
            });

            await this.peopleRepository.vinculaTurma(pessoa.id, classData.id);

            console.info(
                `Pessoa ${pessoa.nome} - ${pessoa.codigo} criada com sucesso, vinculada na turma ${classData.nome}`,
            );

            count++;
        }

        console.info(`Total de pessoas importadas: ${count}`);

        return { message: "Importação realizada com sucesso" };
    }
}
