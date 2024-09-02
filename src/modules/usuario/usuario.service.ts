import { Injectable } from '@nestjs/common';
import { HashUtil } from 'src/shared/utils/hash.util';
import CreateUsuarioDTO from './dto/create-usuario.dto';
import UsuarioRepository from './usuario.repository';
import UpdateUsuarioDto from './dto/update-usuario.dto';

@Injectable()
export default class UsuarioService {
  constructor(private readonly userRepository: UsuarioRepository) {}

  async create(createUserDTO: CreateUsuarioDTO) {
    const hashedPassword = await HashUtil.hashPassword(createUserDTO.senha);
    createUserDTO.senha = hashedPassword;

    return this.userRepository.create(createUserDTO);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOneById(id: number) {
    return this.userRepository.findOneById(id);
  }

  async update(id: number, updateUserDto: UpdateUsuarioDto) {
    const hashedPassword = await HashUtil.hashPassword(updateUserDto.senha);
    updateUserDto.senha = hashedPassword;

    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.remove(id);
  }
}
