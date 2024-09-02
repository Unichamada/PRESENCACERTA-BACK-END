import { PartialType } from '@nestjs/mapped-types';
import CreateUsuarioDTO from './create-usuario.dto';

export default class UpdateUsuarioDto extends PartialType(CreateUsuarioDTO) {}
