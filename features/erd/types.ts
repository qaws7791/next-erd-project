export interface TableColumn {
  name: string;
  type: string;
}

export interface Table {
  name: string;
  columns: TableColumn[];
}

export interface ForeignKeyConstraint {
  table: string;
  column: string;
  foreignTable: string;
  foreignColumn: string;
}

export interface DatabaseSchema {
  tables: Table[];
  constraints: ForeignKeyConstraint[];
}
