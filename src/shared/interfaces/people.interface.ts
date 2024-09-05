export interface IPeople {
    id?: number;
    codigo: string;
    nome: string;
    cpf?: string;
    tipoId?: number;
    unidadeId?: number;
    usuarioId?: number;

    /*
  tipo?: IPeopleType;
  unidade?: IUnit;
  usuario?: IUser;
  turmas?: IPeopleClass[];
  materias?: ITeacherSubjectClass[];
  presencas?: IPresence[];
  */
}
