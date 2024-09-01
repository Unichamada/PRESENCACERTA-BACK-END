import { Injectable } from '@nestjs/common';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';
import PeopleRepository from './people.repository';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleRepository: PeopleRepository) {}

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
}
