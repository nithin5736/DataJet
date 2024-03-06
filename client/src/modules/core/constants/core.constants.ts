import { type CoreState } from '../interfaces';

export const CORE_INITIAL_STATE: CoreState = {
  query: {
    id: '',
    name: '',
    options: {
      type: 'Get',
      baseUrl: '',
      path: '',
      headers: '',
      body: '',
      params: '',
      collection: '',
      filter: '',
      field: '',
      mongoooptions: '',
      document: '',
      updatedContent: '',
      replacedContent: ''
    },
    createdAt: '',
    datasourceId: '',
    dataSourceType: '',
    isEditing: false
  },
  dataSource: {
    id: '',
    name: '',
    type: '',
    options: {
      connectionString: '',
      baseUrl: '',
      headers: ''
    },
    isEditing: false,
    createdAt: ''
  },
  dataSourcesList: [],
  queriesList: []
};
