import { type DataSource, type Query } from '.';

export interface CoreState {
  query: Query;
  dataSource: DataSource;
  dataSourcesList: DataSource[];
  queriesList: Query[];
}
