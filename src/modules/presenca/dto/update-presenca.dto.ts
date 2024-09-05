import { PartialType } from "@nestjs/mapped-types";
import CreatePresencaDto from "./create-presenca.dto";

export default class UpdatePresencaDto extends PartialType(CreatePresencaDto) {}
