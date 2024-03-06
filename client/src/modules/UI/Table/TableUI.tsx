import React, { useEffect, useState } from 'react';
import { Spin, Table } from 'antd';

import { FormElementInstance } from '../../core/Interface/FormElements';
import useDesigner from '../../shared/hooks/UseDesigner';
import { Columns, DataSource } from '../Table/dataJson';
import { restapiRun } from '../../core/components/Querypanel/restapiRun';
import { LoadingOutlined } from '@ant-design/icons';
import { mongodbRun } from '../../core/components/Querypanel/mongodbRun';
import { useAppSelector } from '../../shared/hooks/useAppSelector';

export interface TableProps {
  element: FormElementInstance;
  height: number;
  width: number;
}

const TableUI: React.FC<TableProps> = ({ element }) => {
  const [data, setData] = useState<Record<string, unknown>[] | null>(null);
  const dataSourcesList = useAppSelector((state) => state.core.dataSourcesList)
  const { elements } = useDesigner();
  const sethandledata = async () => {
    const newElement = elements.find((el) => el.id === element.id);
    if(newElement !== undefined)
    {
      console.log("query data:   ", newElement.data?.querydata);
      try{

        const datasource = dataSourcesList.find((dataSource) => {
          if (dataSource.id === newElement.data?.querydata.datasourceId) {
            // setQuery(query);
            return dataSource;
          }
        });

      if(datasource?.type === 'api')
      {const queryres = await restapiRun(newElement.data?.querydata) as { data: any };
      // console.log(queryres);
      setData(queryres.data as any);
      }else {
        const queryres = await mongodbRun(newElement.data?.querydata) as { data: any };
      console.log("here buddy");
      setData(queryres.data as any);
      }
      } catch(err) {
        console.log(err);
      }
      }
      setLoading(false);
  };
  const[loading, setLoading] = useState(false);
  useEffect(()=>{

    if(element.createdAt!=='')
    {
      setLoading(true);
      sethandledata();
    }
  },[]);
  
  useEffect(()=>
  {   
      console.log("here ",element);
      sethandledata();
  },[element]);
  return (
    <div>
      {loading && <div className='flex justify-center items-center h-20'><Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></div>}
      {!loading && !data && (
        <Table
          style={{
            color: 'black',
            backgroundColor: 'white',
            height: element.properties.height,
            width: element.properties.width
          }}
          columns={Columns}
          dataSource={DataSource}
          pagination={{ pageSize: 25, hideOnSinglePage: true }}
          scroll={{ y: element.properties.height }}
        />
      )}
      {!loading && data && data.length > 0 && (
        <Table
          style={{
            color: 'black',
            backgroundColor: 'white',
            height: element.properties.height,
            width: element.properties.width
          }}
          columns={Object.keys(data[0]).map((key) => ({
            title: key,
            dataIndex: key,
            key: key
            // width: 50
          }))}
          dataSource={
            data
          }
          pagination={{ pageSize: 25, hideOnSinglePage: true }}
          scroll={{ y: element.properties.height }}
        />
      )}
      {!loading && data && Object.keys(data).length === 0 && (
        <Table
          style={{
            color: 'black',
            backgroundColor: 'white',
            height: element.properties.height,
            width: element.properties.width
          }}
          columns={Columns}
          dataSource={DataSource}
          pagination={{ pageSize: 25, hideOnSinglePage: true }}
          scroll={{ y: element.properties.height }}
        />
      )}
    </div>
  );
};

export default TableUI;
