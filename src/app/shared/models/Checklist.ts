export enum ChecklistInputType {
  INPUT = 1,
  CHECKBOX,
  DATE,
  SELECT,
  MULT_SELECT,
}

export class ChecklistDetail {
  id?: number;
  descricao: string;
  importante: boolean;
}

export class ChecklistQuestion {
  id?: number;
  descricao: string;
  tipoInput: ChecklistInputType;
  tipo: number;
  grupo: string;
  opcoesResposta?: { descricao: string, valor: unknown }[];
  sugestao?: any;
}

export class Checklist {

  observacoes: ChecklistDetail[];
  grupos: { titulo: string, perguntas: ChecklistQuestion[] }[];

  public static fromRequest(requestResponse: { observacoes: ChecklistDetail[], perguntas: ChecklistQuestion[] }) {
    const groups: { titulo: string, perguntas: ChecklistQuestion[] }[] = [];
    requestResponse.perguntas.forEach(question => {
      const index = groups.map(group => group.titulo).indexOf(question.grupo);
      if (index < 0) {
        groups.push({ titulo: question.grupo, perguntas: [question] });
      } else {
        groups[index].perguntas.push(question);
      }
    });
    const checklist = new Checklist();
    checklist.observacoes = requestResponse.observacoes;
    checklist.grupos = groups;
    return checklist;
  }

}

export class ChecklistAnswer {
  perguntaId: number;
  roteiroId: number;
  resposta: any; // Vira string
  observacoes: string;
}
