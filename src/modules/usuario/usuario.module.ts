import { Module } from '@nestjs/common';
import UsuarioRepository from './usuario.repository';
import UsuarioService from './usuario.service';
import UsuarioController from './usuario.controller';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository],
})
export default class UsuarioModule {}
