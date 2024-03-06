import React, { useEffect, useState } from 'react';
// import { message } from 'antd';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { DataSource } from '../../interfaces';
import { setDataSourcesList, setQuery } from '../../reducers/core.reducer';
import QueryCard from './QueryCard';
import axios from 'axios';

const QueryDataPane: React.FC = () => {
  const dataSourcesList = useAppSelector((state) => state.core.dataSourcesList);

  const dispatch = useAppDispatch();

  const fetchdatasources = async () => {
    try {
      const res = await axios.get('api/data-sources');
      if (res.data && Array.isArray(res.data)) {
        dispatch(setDataSourcesList(res.data as []));
      }
    } catch (error) {
      // showError();
      console.error('Error fetching datasources:', error);
    }
  };

  const handleEditingNewQuery = (data: DataSource) => {
    setPopoverVisible(!popoverVisible);
    if (data.type === 'api') {
      dispatch(
        setQuery({
          options: {
            baseUrl: data.options.baseUrl,
            type: 'GET',
            headers: '',
            body: '',
            params: ''
          },
          id: '',
          name: 'Queryname',
          createdAt: '',
          datasourceId: data.id,
          dataSourceType: data.type,
          isEditing: true
        })
      );
    } else {
      dispatch(
        setQuery({
          options: {
            connectionString: data.options.connectionString,
            type: 'List Collections'
          },
          id: '',
          name: 'Queryname',
          createdAt: '',
          datasourceId: data.id,
          dataSourceType: data.type,
          isEditing: true
        })
      );
    }
  };
  const [popoverVisible, setPopoverVisible] = useState(false);

  const handlePopoverClose = () => {
    if (popoverVisible) setPopoverVisible(false);
    else setPopoverVisible(true);
  };

  useEffect(() => {
    fetchdatasources();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="queries-header flex flex-row justify-between items-center py-3 px-4 border-solid border-b border-0 border-gray-300 h-12">
          <div className="basis-1/4 flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#3e4240"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                clipRule="evenodd"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#3e4240"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#3e4240"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <OverlayTrigger
            trigger="click"
            placement="right-end"
            show={popoverVisible}
            overlay={
              <Popover className="w-60 max-w-64 position:absolute border-solid border border-gray-300 rounded-md bg-white">
                <Popover.Header>
                  <form className="max-w-md mx-auto bg-transparent">
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="black"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        className="block font-semibold w-full p-4 ps-10 text-gray-900 bg-gray-50 border-solid border-b border-0 border-gray-300 focus:outline-none rounded h-10"
                        placeholder="Search"
                        required
                      />
                    </div>
                  </form>
                </Popover.Header>
                <div className="p-2 h-40 overflow-auto">
                  <Popover.Body>
                    <div className="p-2">
                      <button className="flex bg-transparent font-semibold text-black-700 hover:text-black py-2 px-2 border-0 rounded w-full">
                        REST API
                      </button>
                      {dataSourcesList
                        .filter((data) => data.type === 'api')
                        .map((data: DataSource) => (
                          <div
                            onClick={() => handleEditingNewQuery(data)}
                            key={data.id}
                            className="flex text-sm bg-transparent hover:bg-gray-200 text-black-200 hover:text-black py-2 ml-2 mr-2 px-3 border-0 rounded"
                          >
                            {data.name}
                          </div>
                        ))}
                    </div>
                  </Popover.Body>
                  <Popover.Body>
                    <div className="p-2 pt-0">
                      <button className="flex bg-transparent font-semibold text-black-700 hover:text-black py-2 px-2 border-0 rounded w-full">
                        MongoDB
                      </button>
                      {dataSourcesList
                        .filter((data) => data.type === 'database')
                        .map((data: DataSource) => (
                          <div
                            onClick={() => handleEditingNewQuery(data)}
                            key={data.id}
                            className="flex text-sm bg-transparent hover:bg-gray-200 text-black-200 hover:text-black py-2 ml-2 mr-2 px-3 border-0 rounded"
                          >
                            {data.name}
                          </div>
                        ))}
                    </div>
                  </Popover.Body>
                </div>
                <Popover.Body>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        navigate('/datasource');
                      }}
                      className="flex bg-blue-50 hover:bg-blue-100 font-semibold text-blue-700 font-semibold py-2 px-4 border-0 rounded justify-center w-full"
                    >
                      +Add new Data Source
                    </button>
                  </div>
                </Popover.Body>
              </Popover>
            }
          >
            <button
              onClick={handlePopoverClose}
              className="bg-transparent hover:bg-gray-100 text-gray-700 font-semibold py-1 px-4 border border-grey-500 rounded"
            >
              + Add queries
            </button>
          </OverlayTrigger>
        </div>
        <div className="queries-list flex flex-col py-3 px-4 overflow-auto">
          <QueryCard />
        </div>
      </div>
    </>
  );
};

export default QueryDataPane;