import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import ClassRepository from './class.repository';
import { IClass } from 'src/shared/interfaces/class.interface';

@Injectable()
export class ClassService {
  constructor(private readonly classRepository: ClassRepository) {}

  async create(createClassDto: CreateClassDto): Promise<IClass> {
    return this.classRepository.create(createClassDto);
  }

  async findAll(): Promise<IClass[]> {
    return this.classRepository.findAll();
  }

  async findOne(id: number): Promise<IClass> {
    return this.classRepository.findOneById(id);
  }

  async update(id: number, updateClassDto: UpdateClassDto): Promise<IClass> {
    return this.classRepository.update(id, updateClassDto);
  }

  async remove(id: number): Promise<IClass> {
    return this.classRepository.remove(id);
  }
}
