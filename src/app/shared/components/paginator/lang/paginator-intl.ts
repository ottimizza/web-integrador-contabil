import { MatPaginatorIntl } from '@angular/material';

const PORTUGUESE_RANGE_LABEL = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return `0 de ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
};

export const PORTUGUESE_PAGINATOR_INTL = () => {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Itens por página';
  paginatorIntl.nextPageLabel = 'Próxima página',
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.getRangeLabel = PORTUGUESE_RANGE_LABEL;

  return paginatorIntl;
};
