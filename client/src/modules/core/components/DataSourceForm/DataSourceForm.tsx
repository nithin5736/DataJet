import { ChangeEvent, useEffect, useState } from 'react';

import Logo from '../../../../assets/mongodb.png';
import { useAppDispatch } from '../../../shared/hooks/useAppDispatch';
import { setDataSource, setDataSourcesList } from '../../reducers/core.reducer';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const DataSourceForm: React.FC = () => {
  const dataSource = useAppSelector((state) => state.core.dataSource);
  const [showpassword, setShowpassword] = useState(false);
  const [connectionString, setConnectionString] = useState(dataSource.options.connectionString);
  const [isEditable, setIsEditable] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [dataSourceName, setDataSourceName] = useState(dataSource.name);

  const dispatch = useAppDispatch();



  const toggle = () => {
    if (showpassword) setShowpassword(false);
    else setShowpassword(true);
  };

  const toggleEdit = () => {
    if (isEditable) setIsEditable(false);
    else setIsEditable(true);
  };
  const handleDiscard = async () => {
    dispatch(setDataSource({ ...dataSource, isEditing: false }));
  };

  const handleQueryChange = () => {
    dispatch(
      setDataSource({
        ...dataSource,
        name: dataSourceName,
        options: { ...dataSource.options, connectionString: connectionString }
      })
    );
  };

  useEffect(() => {
    // console.log("29  "+ baseUrl);
    handleQueryChange();
    // console.log(type + baseUrl);
  }, [dataSourceName, connectionString]);

  useEffect(() => {
    setDataSourceName(dataSource.name);
    setConnectionString(dataSource.options.connectionString);
    // console.log(type + baseUrl);
  }, [dataSource]);

  const handleConnection = async () => {
    try {
      const res = await axios.post('mongodb/connect', { connectionString: connectionString })
      console.log(res);
      setIsConnected(true);
      toast.success('Connection successful', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    } catch (error) {
      console.error(error);
      toast.error('Connection Failed', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    }
  }

  const handleConnectionString = (e: ChangeEvent<HTMLInputElement>) => {
    setConnectionString(e.target.value)
    setIsConnected(false);
  }

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

  const handleCreate = async () => {
    console.log('create')
    if (dataSource.options.connectionString === '') {
      toast.error('Connection String Empty', {
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
          type: 'database',
          options: { connectionString }
        });
        if (response) {
          dispatch(
            setDataSource({
              ...dataSource,
              options: {
                ...dataSource.options,
                baseUrl: '',
                connectionString: connectionString
              },
              name: dataSourceName,
              type: 'database',
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
      }
    }
  };

  const handleUpdate = async () => {
    console.log('connectionString  ' + connectionString);
    const response = await axios.patch(`api/data-sources/${dataSource.id}`, {
      name: dataSourceName,
      type: 'database',
      options: { connectionString }
    });
    if (response) {
      dispatch(
        setDataSource({
          ...dataSource,
          options: {
            ...dataSource.options,
            baseUrl: '',
            connectionString: connectionString
          },
          name: dataSourceName,
          type: 'database',
          isEditing: false
        })
      );
      fetchdatasources();
    } else {
      console.log('error');
    }
  };

  const handleSave = async () => {
    if(dataSource.name==='')
    {
      toast.error('Name cannot be empty', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    }
    else if (dataSource.createdAt === '') await handleCreate();
    else await handleUpdate();
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
        className="flex w-40 border-0 py-1.5 pl-3 ml- text-gray-900 bg-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-01 sm:text-sm sm:leading-6"
        placeholder="DataSourceName"
      />      </div>
      <div className="flex items-center p-4 text-lg">Connect using connection string</div>
      <div className="p-4 text-lg">
        <div className="flex items-center gap-4 pb-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Connection string
          </label>
          <div
            onClick={toggleEdit}
            className={`hover:bg-gray-200 font-semibold text-sm border border-gray-400 rounded shadow py-1 px-8 ${isEditable ? 'bg-gray-300 hover:bg-gray-300' : ''
              }`}
          >
            {isEditable ? 'Cancel' : 'Edit'}
          </div>
        </div>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
          <input
            type={`${showpassword ? 'text' : 'password'}`}
            name="ConnectionString"
            id="ConnectionString"
            value={connectionString}
            onChange={(e) => handleConnectionString(e)}
            className="block flex-1 border-0 py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-01 bg-transparent sm:text-sm sm:leading-6"
            placeholder="*************"
            disabled={!isEditable}
          />
          <svg
            display={showpassword ? 'none' : ''}
            onClick={toggle}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-10 pr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <svg
            display={showpassword ? '' : 'none'}
            onClick={toggle}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-10 pr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </div>
      </div>

      <div className="flex p-4 text-lg place-content-end gap-4">
        <button
          onClick={handleDiscard}
          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-none"
        >
          Discard
        </button>
        <button
          onClick={handleConnection}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Test Connection
        </button>
        {isConnected && <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-none">
          Save
        </button>}
        {!isConnected && <button className="bg-blue-200 text-white font-bold py-2 px-4 rounded border-none">
          Save
        </button>}
      </div>
    </div>
    </div>
  );
};

export default DataSourceForm;