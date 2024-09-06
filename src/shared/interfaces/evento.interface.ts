export interface IEvento {
    id?: number;
    nome: string;
    tipoId: number;
    dataInicio: Date;
    dataFim: Date;
    horaInicio?: Date;
    horaFim?: Date;
    localId?: number;
}
