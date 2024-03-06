export interface DataSourceOptions {
  connectionString: string;
  baseUrl: string;
  headers: string;
}

export interface DataSource {
  id: string;
  name: string;
  type: string;
  options: DataSourceOptions;
  isEditing: boolean;
  createdAt: string;
}
