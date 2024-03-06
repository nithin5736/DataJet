/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Input, Select, Space } from 'antd';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { setQuery } from '../.././reducers/core.reducer';

const RestApiQuery: React.FC = () => {
  const query = useAppSelector((state) => state.core.query);
  const [type, setType] = useState(query.options.type);
  const [collection, setCollection] = useState(query.options.collection);
  //const [pipeline, setPipeline] = useState('');
  const [filter, setFilter] = useState(query.options.filter);
  //const [field, setField] = useState('');
  const [mongooptions, setmongooptions] = useState(query.options.mongoooptions);
  const [document, setDocument] = useState(query.options.document);
  const [updatedContent, setUpdatedContent] = useState(query.options.updatedContent);
  //const [replacedContent, setReplacedContent] = useState('');
  const [dataSourceName, setDataSourceName] = useState('');
  const dataSourcesList = useAppSelector((state) => state.core.dataSourcesList);

  const dispatch = useDispatch();

  const handleQueryChange = () => {
    const obj = {
      type: type,
      collection: collection,
      filter: filter,
      mongooptions: mongooptions,
      document: document,
      updatedContent: updatedContent,
    };
    dispatch(
      setQuery({
        ...query,
        options: { ...query.options, ...obj },
      })
    );
  };
  const handleTypeChange = (value: string) => {
    setType(value);
  };

  useEffect(() => {
    handleQueryChange();
    // console.log(type + collection + filter);
  }, [type, collection, filter, mongooptions, updatedContent]);
  const handlenameupdate = () => {
    const res = dataSourcesList.find((dataSource) => {
      if (dataSource.id === query.datasourceId) {
        setDataSourceName(dataSource.name);
        return dataSource;
      }
    });
    console.log(res);
    if (res === undefined) {
      setDataSourceName('');
    }
  };
  useEffect(() => {
    handlenameupdate();
  }, [query]);

  const handleCollectionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCollection(e.target.value);
  };

  // const handlePipelineChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   setPipeline(e.target.value);
  // };

  const handleDocumentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDocument(e.target.value);
  };

  // const handleFieldChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   setField(e.target.value);
  // };

  const handleFilterChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFilter(e.target.value);
  };

  const handleUpdatedContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedContent(e.target.value);
  };

  // const handleReplacedContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   setReplacedContent(e.target.value);
  // };

  const handleOptionsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setmongooptions(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col w-full h-full pb-3">
        <div className="flex flex-col w-full pt-4">
          <div className="basis-5/6 flex py-3 items-center">
            <div className="py-0 pl-0 pr-7 text-gray-400 font-semibold">DataSource</div>
            <Input
              disabled
              value={dataSourceName}
              style={{ backgroundColor: 'white', color: 'black' }}
            />
          </div>
          <div className="flex items-center py-3">
            <div className="py-0 pl-0 pr-7 text-gray-400 font-semibold pl-2">Operation</div>
            <Space wrap style={{ width: '100%', backgroundColor: 'transparent' }}>
              <Select
                defaultValue={type}
                style={{ width: '47rem', height: 34, backgroundColor: 'transparent' }}
                onChange={handleTypeChange}
                options={[
                  { value: 'List Collections', label: 'List Collections' },
                  //{ value: 'Find One', label: 'Find One' },
                  { value: 'Find Many', label: 'Find Many' },
                  //{ value: 'Total Count', label: 'Total Count' },
                  //{ value: 'Count', label: 'Count' },
                  //{ value: 'Distinct', label: 'Distinct' },
                  { value: 'Insert One', label: 'Insert One' },
                  //{ value: 'Insert Many', label: 'Insert Many' },
                  { value: 'Update One', label: 'Update One' },
                  //{ value: 'Update Many', label: 'Update Many' },
                  //{ value: 'Replace One', label: 'Replace One' },
                  //{ value: 'Find One and Update', label: 'Find One and Update' },
                  //{ value: 'Find One and Replace', label: 'Find One and Replace' },
                  //{ value: 'Aggregate', label: 'Aggregate' },
                  { value: 'Delete One', label: 'Delete One' },
                  //{ value: 'Delete Many', label: 'Delete Many' }
                ]}
              />
            </Space>
          </div>
        </div>
        {type === 'List Collections' && (<></>)}
        {type === 'Insert One' && (
          <>
            <div className="flex items-center py-3">
              <div className="py-0 pl-0 pr-7 text-gray-400 font-semibold pl-2">Collection</div>
              <Input
                value={collection}
                onChange={handleCollectionChange}
                style={{ backgroundColor: 'white', color: 'black' }}
                placeholder="Enter collection"
              />
            </div>
            <div className="flex py-3">
              <div className="py-0 pl-0 pr-6 text-gray-400 font-semibold pl-2">Document</div>
              <textarea
                className="flex w-full rounded border-gray-300 p-1"
                rows={5}
                value={document}
                onChange={(e) => handleDocumentChange(e)}
                style={{ backgroundColor: 'white', color: 'black' }}
              />
            </div>
            <div className="flex py-3">
              <div className="py-0 ml-2.5 pr-7 text-gray-400 font-semibold pl-2">Options</div>
              <textarea
                className="flex w-full rounded border-gray-300 p-1"
                rows={5}
                value={mongooptions}
                onChange={(e) => handleOptionsChange(e)}
                style={{ backgroundColor: 'white', color: 'black' }}
              />
            </div>
          </>
        )}
        {type === 'Update One' && (
          <>
            <div className="flex items-center py-3">
              <div className="py-0 pr-7 text-gray-400 font-semibold pl-2">Collection</div>
              <Input
                value={collection}
                onChange={handleCollectionChange}
                style={{ backgroundColor: 'white', color: 'black' }}
                placeholder="Enter collection"
              />
            </div>
            <div className="flex py-3">
              <div className="py-0 ml-7 pr-7 text-gray-400 font-semibold pl-2">Filter</div>
              <textarea
                className="flex w-full rounded border-gray-300 p-1"
                rows={5}
                value={filter}
                onChange={(e) => handleFilterChange(e)}
                style={{ backgroundColor: 'white', color: 'black' }}
              />
            </div>
            <div className="flex py-3">
              <div className="py-0 ml-3.5 pr-7 text-gray-400 font-semibold pl-2">Update</div>
              <textarea
                className="flex w-full rounded border-gray-300 p-1"
                rows={5}
                value={updatedContent}
                onChange={(e) => handleUpdatedContentChange(e)}
                style={{ backgroundColor: 'white', color: 'black' }}
              />
            </div>
            <div className="flex py-3">
              <div className="py-0 ml-2.5 pr-7 text-gray-400 font-semibold pl-2">Options</div>
              <textarea
                className="flex w-full rounded border-gray-300 p-1"
                rows={5}
                value={mongooptions}
                onChange={(e) => handleOptionsChange(e)}
                style={{ backgroundColor: 'white', color: 'black' }}
              />
            </div>
          </>
        )}
        {type === 'Delete One' && (
          <>
            <div className="flex items-center py-3">
              <div className="py-0 pl-0 pr-7 text-gray-400 font-semibold pl-2">Collection</div>
              <Input
                value={collection}
                onChange={handleCollectionChange}
                style={{ backgroundColor: 'white', color: 'black' }}
                placeholder="Enter collection"
              />
            </div>
            <div className="flex py-3">
              <div className="py-0 ml-7 pr-7 text-gray-400 font-semibold pl-2">Filter</div>
              <textarea
                className="flex w-full rounded border-gray-300 p-1"
                rows={5}
                value={filter}
                onChange={(e) => handleFilterChange(e)}
                style={{ backgroundColor: 'white', color: 'black' }}
              />
            </div>
            <div className="flex py-3">
              <div className="py-0 ml-2.5 pr-7 text-gray-400 font-semibold pl-2">Options</div>
              <textarea
                className="flex w-full rounded border-gray-300 p-1"
                rows={5}
                value={mongooptions}
                onChange={(e) => handleOptionsChange(e)}
                style={{ backgroundColor: 'white', color: 'black' }}
              />
            </div>
          </>
        )}
        {type === 'Find Many' && (
          <>
            <div className="flex items-center py-3">
              <div className="py-0 pl-0 pr-7 text-gray-400 font-semibold pl-2">Collection</div>
              <Input
                value={collection}
                onChange={handleCollectionChange}
                style={{ backgroundColor: 'white', color: 'black' }}
                placeholder="Enter collection"
              />
            </div>
            <div className="flex py-3">
              <div className="py-0 ml-7 pr-7 text-gray-400 font-semibold pl-2">Filter</div>
              <textarea
                className="flex w-full rounded border-gray-300 p-1"
                rows={5}
                value={filter}
                onChange={(e) => handleFilterChange(e)}
                style={{ backgroundColor: 'white', color: 'black' }}
              />
            </div>
            <div className="flex py-3">
              <div className="py-0 ml-2.5 pr-7 text-gray-400 font-semibold pl-2">Options</div>
              <textarea
                className="flex w-full rounded border-gray-300 p-1"
                rows={5}
                value={mongooptions}
                onChange={(e) => handleOptionsChange(e)}
                style={{ backgroundColor: 'white', color: 'black' }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RestApiQuery;