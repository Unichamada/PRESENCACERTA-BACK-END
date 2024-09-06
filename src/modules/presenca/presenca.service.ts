import { Injectable } from "@nestjs/common";
import PresencaRepository from "./presenca.repository";
import CreatePresencaDto from "./dto/create-presenca.dto";
import UpdatePresencaDto from "./dto/update-presenca.dto";
import PeopleRepository from "../people/people.repository";

@Injectable()
export default class PresencaService {
    constructor(
        private readonly presencaRepository: PresencaRepository,
        private readonly pessoaRepository: PeopleRepository,
    ) {}

    async create(createPresencaDto: CreatePresencaDto) {
        const pessoa = await this.pessoaRepository.findByCode(
            createPresencaDto.matricula,
        );

        createPresencaDto.pessoaId = pessoa.id;

        return this.presencaRepository.create(createPresencaDto);
    }

    findAll() {
        return this.presencaRepository.findAll();
    }

    findOne(id: number) {
        return this.presencaRepository.findOneById(id);
    }

    update(id: number, updatePresencaDto: UpdatePresencaDto) {
        return this.presencaRepository.update(id, updatePresencaDto);
    }

    remove(id: number) {
        return this.presencaRepository.remove(id);
    }
}
