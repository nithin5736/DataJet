import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import Logo from '../../../../assets/restAPI.png';
import { useAppDispatch } from '../../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { setDataSource, setDataSourcesList } from '../../reducers/core.reducer';
import axios from 'axios';

const RestAPIForm: React.FC = () => {
  const dataSource = useAppSelector((state) => state.core.dataSource);

  const [dataSourceName, setDataSourceName] = useState(dataSource.name);
  const [baseUrl, setBaseUrl] = useState(dataSource.options.baseUrl);

  const dispatch = useAppDispatch();

  const handleQueryChange = () => {
    dispatch(
      setDataSource({
        ...dataSource,
        name: dataSourceName,
        options: { ...dataSource.options, baseUrl: baseUrl }
      })
    );
  };

  useEffect(() => {
    // console.log("29  "+ baseUrl);
    handleQueryChange();
    // console.log(type + baseUrl);
  }, [dataSourceName, baseUrl]);

  useEffect(() => {
    setDataSourceName(dataSource.name);
    setBaseUrl(dataSource.options.baseUrl);
    // console.log(type + baseUrl);
  }, [dataSource]);

  const fetchdatasources = async () => {
    try {
      const res = await axios.get('api/data-sources');
      if (res.data && Array.isArray(res.data)) {
        dispatch(setDataSourcesList(res.data as []));
      }
      // console.log(res+" dczcx");
    } catch (error) {
      console.error('Error fetching datasources:', error);
    }
  };

  const handleCreate = async () => {
    if (dataSource.options.baseUrl === '') {
      toast.error('baseUrl empty', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    } else {
      try {
        const response = await axios.post('api/data-sources', {
          ...dataSource,
          name: dataSourceName,
          type: 'api',
          options: { baseUrl }
        });
        if (response) {
          // console.log(response);
          dispatch(
            setDataSource({
              ...dataSource,
              options: {
                ...dataSource.options,
                baseUrl: baseUrl,
                connectionString: ''
              },
              name: dataSourceName,
              type: 'RestAPI',
              isEditing: false,
              createdAt: response.data.createdAt,
              id: response.data.id
            })
          );

          fetchdatasources();
        }
      } catch (error) {
        toast.error('Request Failed', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
        // console.log('error');
      }
    }
  };

  const handleUpdate = async () => {
    console.log('base  ' + baseUrl);
    const response = await axios.patch(`api/data-sources/${dataSource.id}`, {
      name: dataSourceName,
      type: 'RestAPI',
      options: { baseUrl }
    });
    if (response) {
      dispatch(
        setDataSource({
          ...dataSource,
          options: {
            ...dataSource.options,
            baseUrl: baseUrl,
            connectionString: ''
          },
          name: dataSourceName,
          type: 'api',
          isEditing: false
        })
      );
      fetchdatasources();
    } else {
      console.log('error');
    }
  };

  const handleSave = async () => {
    if (dataSource.createdAt === '') await handleCreate();
    else await handleUpdate();
  };
  const handleDiscard = async () => {
    dispatch(setDataSource({ ...dataSource, isEditing: false }));
  };
  return (
    <div className="w-full h-full flex flex-row p-2 place-content-center">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="p-2 h-4/7 w-3/6 flex flex-col border-solid border-2 border-slate-300 rounded">
        <div className="flex items-center p-4">
          <img src={Logo} alt="loading" height={40} />
          <input
            type="text"
            name="DataSourceName"
            id="DataSourceName"
            value={dataSourceName}
            onChange={(e) => setDataSourceName(e.target.value)}
            className="flex w-30 rounded border-0 py-1.5 pl-3 ml-2 text-gray-900 bg-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-01 sm:text-sm sm:leading-6"
            placeholder="DataSourceName"
          />
        </div>
        <div className="flex items-center p-4 text-lg">Connect using connection string</div>
        <div className="p-4 text-lg">
          <div className="flex items-center gap-4 pb-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">Base Url</label>
          </div>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
            <input
              type="text"
              name="baseUrl"
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="block flex-1 border-0 py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-01 bg-transparent sm:text-sm sm:leading-6"
              placeholder="baseUrl"
            />
          </div>
          <div className="flex p-4 pb-0 pr-0 text-lg place-content-end gap-4">
            <button
              onClick={handleDiscard}
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-none"
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-none"
            >
              Save
            </button>
            {/* {text} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestAPIForm;
