import { PartialType } from "@nestjs/mapped-types";
import CreateEventoDto from "./create-evento.dto";

export default class UpdateEventoDto extends PartialType(CreateEventoDto) {}
