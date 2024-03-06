export interface QueryOptions {
  type: string;
  baseUrl?: string;
  connectionString?: string;
  path?: string;
  headers?: string;
  params?: string;
  body?: string;
  collection?: string;
  pipeline?: string;
  filter?: string;
  field?: string;
  mongoooptions?: string;
  document?: string;
  updatedContent?: string;
  replacedContent?: string;
}

export interface Query {
  createdAt: string;
  id: string;
  name: string;
  options: QueryOptions;
  datasourceId: string;
  dataSourceType: string;
  isEditing: boolean;
}
