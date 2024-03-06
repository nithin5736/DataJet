import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import mongoDBlogo from '../../../../assets/mongodb.png';
import restAPIlogo from '../../../../assets/restAPI.png';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { Query } from '../../interfaces';
import { setQueriesList, setQuery } from '../../reducers/core.reducer';
import axios from 'axios';

export default function QueryCard() {
  const queriesList = useAppSelector((state) => state.core.queriesList);
  const dataSourcesList = useAppSelector((state) => state.core.dataSourcesList);
  const query = useAppSelector((state) => state.core.query);

  const dispatch = useDispatch();
  const handleicon = (id: string) => {
    const temp = dataSourcesList.find((dataSource) => {
      if (dataSource.id === id) {
        return dataSource;
      }
    });
    if (temp) return temp.type;
    else return '';
  };
  const fetchqueries = async () => {
    try {
      const res = await axios.get('api/queries');
      if (res.data && Array.isArray(res.data)) {
        dispatch(setQueriesList(res.data as []));
      }
    } catch (error) {
      console.error('Error fetching queries:', error);
    }
  };

  const handleDelete = async (data: Query) => {
    const res = await axios.delete(`api/${data.datasourceId}/queries/${data.id}/`);
    if (res.data && Array.isArray(res.data)) {
      if (queriesList.length == 0) {
        dispatch(
          setQuery({
            id: '',
            name: '',
            options: {
              type: '',
              baseUrl: '',
              headers: '',
              body: '',
              params: ''
            },
            createdAt: '',
            datasourceId: '',
            dataSourceType: '',
            isEditing: false
          })
        );
      } else {
        dispatch(setQuery({ ...queriesList[0] }));
      }
      await fetchqueries();
    }
  };
  const handleselect = (data: Query) => {
    dispatch(setQuery(data));
  };
  useEffect(() => {
    fetchqueries();
  }, []);
  return (
    <div className="flex flex-col">
      {queriesList.length === 0 ? (
        <div className="flex justify-center">no queries</div>
      ) : (
        queriesList.map((data) => (
          <button
            onClick={() => handleselect(data)}
            key={data.id}
            className={`${
              query.id === data.id ? 'bg-gray-200' : 'bg-transparent'
            } flex items-center hover:bg-gray-200 focus:bg-gray-200 font-semibold text-blue-700 font-semibold py-2 px-4 pl-3 border-0 rounded w-full`}
          >
            <div className='flex items-center justify-center w-8 mr-1'>
            <img
              className={`h-6 ${handleicon(data.datasourceId) === 'api' ? 'w-6' : 'w-7'}`}
              src={handleicon(data.datasourceId) === 'api' ? restAPIlogo : mongoDBlogo}
              alt="ic"
            />
            </div>
            {data.name}
            <div className="flex ml-auto mr-0">
              <svg
                onClick={() => handleDelete(data)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 ml-3 hover:stroke-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
            </div>
          </button>
        ))
      )}
    </div>
  );
}