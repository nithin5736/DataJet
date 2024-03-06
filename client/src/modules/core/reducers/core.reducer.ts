import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CORE_INITIAL_STATE } from '../constants';
import { type CoreState, type DataSource, type Query } from '../interfaces';

const coreSlice = createSlice({
  reducerPath: 'core',
  name: 'core',
  initialState: CORE_INITIAL_STATE,
  reducers: {
    setQuery: (state: CoreState, action: PayloadAction<Query>) => {
      state.query = action.payload;
    },
    setDataSource: (state: CoreState, action: PayloadAction<DataSource>) => {
      state.dataSource = action.payload;
    },
    setQueriesList: (state: CoreState, action: PayloadAction<[]>) => {
      state.queriesList = action.payload;
    },
    setDataSourcesList: (state: CoreState, action: PayloadAction<[]>) => {
      state.dataSourcesList = action.payload;
    }
  }
});

export const { setQuery, setDataSource, setQueriesList, setDataSourcesList } = coreSlice.actions;
export default coreSlice;
