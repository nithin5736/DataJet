import { useEffect, useState } from 'react';

import mongoDBlogo from '../../../../assets/mongodb.png';
import restAPIlogo from '../../../../assets/restAPI.png';
import { useAppDispatch } from '../../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { type DataSource } from '../../interfaces';
import { setDataSource, setDataSourcesList } from '../../reducers/core.reducer';
import axios from 'axios';

const DataSourceSideBar: React.FC = () => {
  const dataSourcesList = useAppSelector((state) => state.core.dataSourcesList);
  const dataSource = useAppSelector((state) => state.core.dataSource);

  const dispatch = useAppDispatch();
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource>(dataSource);

  const fetchdatasources = async () => {
    try {
      const res = await axios.get('api/data-sources');
      if (res.data && Array.isArray(res.data)) {
        dispatch(setDataSourcesList(res.data as []));
      }
    } catch (error) {
      console.error('Error fetching datasources:', error);
    }
  };
  const handleDelete = async (id: any) => {
    try {
      const res = await axios.delete(`api/data-sources/${id}`);
      if (res.data && Array.isArray(res.data)) {
        dispatch(
          setDataSource({
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
          })
        );
        await fetchdatasources();
      }
    } catch (error) {
      console.error('Error fetching datasources:', error);
    }
  };

  useEffect(() => {
    fetchdatasources();
  }, []);

  const handleSelectedDataSource = async (data: DataSource) => {
    // console.log(data.name + '0   ');
    setSelectedDataSource({ ...data, isEditing: true });
    // console.log(data.name + '1   ');
  };

  useEffect(() => {
    // console.log(selectedDataSource);
    dispatch(setDataSource(selectedDataSource));
  }, [selectedDataSource]);

  return (
    <div className="flex flex-col w-64 bg-gray-50">
      <div className="p-4 font-semibold text-sky-800">Data Sources added</div>
      <div className="p-2 overflow-auto">
        {dataSourcesList.map((data: DataSource) => (
          <div key={data.id} className="p-2">
            <button
              onClick={() => handleSelectedDataSource(data)}
              className="flex bg-transparent hover:bg-gray-200 font-semibold text-blue-700 font-semibold py-2 px-4 border-0 rounded w-full"
            >
              <img
                className="pr-2 w-5 h-5"
                src={data.type == 'api' ? restAPIlogo : mongoDBlogo}
                alt="ic"
              />
              <div className="font-normal">{data.name}</div>
              <svg
                onClick={() => handleDelete(data.id)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="gray"
                className="w-4 h-4 mr-0 ml-auto hover:stroke-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataSourceSideBar;