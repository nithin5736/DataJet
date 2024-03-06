import React, { useEffect, useState } from 'react';
import ReactJSON from 'react-json-view';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { setQueriesList, setQuery } from '../../reducers/core.reducer';
import RestApiQuery from './RestApiQuery';
import { restapiRun } from './restapiRun';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
// import { useNavigate } from 'react-router-dom';
import { ToastContainer, ToastContentProps, toast } from 'react-toastify';
import axios from 'axios';
import { mongodbRun } from './mongodbRun';
import MongoDBQuery from './MongoDBQuery';

const QueryManager: React.FC = () => {
  const query = useAppSelector((state) => state.core.query);
  const dataSourcesList = useAppSelector((state) => state.core.dataSourcesList);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [dataSourceType, setDataSourceType] = useState('')
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const temp = dataSourcesList.find((dataSource) => {
      if (dataSource.id === query.datasourceId) {
        return dataSource;
      }
    })
    if (temp) setDataSourceType(temp.type);
  }, [query])
  const handlePreview = async () => {
    try {
      var objDiv = document.getElementById("querybody");
      if (objDiv)
        objDiv.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      setLoading(true);
      setData({});

      let newData = {};
      console.log("res ", newData);

      if (dataSourceType === 'api')
      newData = await restapiRun(query) as { data: { status: number; message: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined; } };
      else newData = await mongodbRun(query) as { data: { status: number; message: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined; } };

      if (typeof newData !== undefined) {
        //if we are getting some response and url is not empty
        setData(newData);
      }
      setLoading(false);
    } catch (error: any) {
      const errorCode = error.code;
      if (errorCode === 'ERR_BAD_REQUEST') {
        toast.error("Wrong URL", {
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
      // console.error('Error occurred:', error);

      // console.error('Error occurred:', error);
      setLoading(false);
    }
  };

  const handleClick = () => {
   try {
    handlePreview();
  }
   catch(error){
    console.error('Error occurred:', error)
  };
  };

  const fetchqueries = async () => {
    try {
      const res = await axios.get('api/queries');
      if (res.data && Array.isArray(res.data)) {
        dispatch(setQueriesList(res.data as []));
      }
    } catch (error) {
      console.error('Error fetching datasources:', error);
    }
  };
  const handleSave = async () => {
    // console.log(query);
    setSaveLoading(true);
    try {
      if (query.createdAt === '') {
        const response = await axios.post(`api/${query.datasourceId}/queries`, {
          name: query.name,
          options: query.options
        });
        if (response) {
          // console.log(response);
          const data = response.data;
          dispatch(setQuery({ ...query, id: data.id }));
          fetchqueries();
        } else {
          console.log('error');
        }
      } else {
        const response = await axios.patch(`api/${query.datasourceId}/queries/${query.id}`, {
          name: query.name,
          options: query.options
        });
        if (response) {
          // console.log(response);
          const data = response.data;
          dispatch(setQuery({ ...query, id: data.id }));
          fetchqueries();
          dispatch(setQuery({ ...query, isEditing: true }));
        } else {
          console.log('error');
        }
      }
    } catch (error) {
      toast.error("Query name already exists!", {
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
    setSaveLoading(false);
  };


  return (
    <>
      <div className="queries-definition-panel flex flex-col h-full" style={{ width: "900px" }}>
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
        <div className="queries-header flex flex-row justify-between items-center py-3 px-1 border-solid border-b border-0 border-gray-300 h-12">
          <input
            type="text"
            name="QueryName"
            id="QueryName"
            value={query.name}
            onChange={(e) => dispatch(setQuery({ ...query, name: e.target.value }))}
            className="flex w-30 h-7 pl-2 ml-2 rounded border-0 text-gray-900 rounded hover:bg-gray-300 rounded bg-gray-200 placeholder:text-gray-400 focus:bg-gray-200 focus:outline-none focus:ring-01 sm:text-sm sm:leading-0"
            placeholder="Query Name"
          />
          <div className="querybtn py-1 px-4 flex gap-4">
           {!saveLoading &&
            <button
              onClick={handleSave}
              className="bg-transparent hover:bg-gray-100 text-gray-700 font-semibold py-1 px-4 border border-grey-500 rounded"
            >
              Save
            </button>
            }
            {saveLoading && 
            <button
            onClick={handleSave}
            disabled
            className="bg-gray-200 text-gray-700 font-semibold py-1 px-4 border border-grey-500 rounded"
          >
            Save
          </button>
            }
            <button
              onClick={handleClick}
              className="bg-transparent hover:bg-blue-100 text-blue-700 font-semibold py-1 px-4 border border-blue-500 rounded"
            >
              Preview
            </button>
            {/* <button
              onClick={handleClick}
              className="bg-transparent hover:bg-blue-100 text-blue-700 font-semibold py-1 px-4 border border-blue-500 rounded"
            >
              Run
            </button> */}
          </div>
        </div>
        <div id="querybody" className="overflow-auto pr-2">
          <div className="px-4 grid justify-items-center">
            {query.datasourceId === '' ? (
              <div className="flex items-center font-semibold mt-8">Select a query</div>
            ) : (
              (dataSourceType === 'api' ? < RestApiQuery /> : <MongoDBQuery />)
            )}
          </div>
          <div className="m-4 h-32 mt-8 flex-1">
            <div className="bg-gray-200 rounded h-40 flex-1">
              <div className="flex bg-gray-100 border border-gray-200 border-solid h-8 p-2 px-4">
                <div>Preview</div>
                <div className="mr-0 ml-auto">JSON</div>
              </div>
              {data && (
                <div className="p-4 h-36 overflow-auto">
                  {loading && <div className='flex justify-center items-center h-20'><Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></div>}
                  {!loading && <ReactJSON src={data} />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QueryManager;