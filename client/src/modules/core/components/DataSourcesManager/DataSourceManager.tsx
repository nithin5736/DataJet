import DynamoDBLogo from '../../../../assets/aws-dynamodb.svg';
import BigQueryLogo from '../../../../assets/bigquery.svg';
import ClickHouseLogo from '../../../../assets/clickhouse.svg';
import CosmosDBLogo from '../../../../assets/Cosmos BD.svg';
import CouchDBLogo from '../../../../assets/CouchDB.svg';
import ElasticSearchLogo from '../../../../assets/elasticsearch.svg';
import FirestoreLogo from '../../../../assets/file-type-firestore.svg';
import InfluxDBLogo from '../../../../assets/influxdb.svg';
import MariaDBLogo from '../../../../assets/mariadb-icon.svg';
import MongoDBLogo from '../../../../assets/mongodb.png';
import MySQLLogo from '../../../../assets/mysql-icon.svg';
import OracleDBLogo from '../../../../assets/oracle-icon.svg';
import PostgreLogo from '../../../../assets/postgresql-icon.svg';
import RedisDBLogo from '../../../../assets/redis-icon.svg';
import RestAPILogo from '../../../../assets/restAPI.png';
import ReThinkDBLogo from '../../../../assets/rethinkdb.svg';
import SAPLogo from '../../../../assets/sap-3.svg';
import SnowflakeLogo from '../../../../assets/snowflake-icon.svg';
import SQLServerLogo from '../../../../assets/sql-server-icon.svg';
import TypeSenseLogo from '../../../../assets/typesense.png';
import { useAppDispatch } from '../../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { setDataSource } from '../../reducers/core.reducer';
import DataSourceForm from '../DataSourceForm/DataSourceForm';
import RestAPIForm from '../RestAPIForm/RestApiForm';

const DataSourceManager: React.FC = () => {
  const isEditing = useAppSelector((state) => state.core.dataSource.isEditing);
  const dataSource = useAppSelector((state) => state.core.dataSource);

  const dispatch = useAppDispatch();

  const handleCreateApi = () => {
    dispatch(
      setDataSource({
        options: {
          baseUrl: '',
          connectionString: '',
          headers: ''
        },
        id: '',
        name: '',
        type: 'api',
        isEditing: true,
        createdAt: ''
      })
    );
  };

  const handleCreateDB = () => {
    dispatch(
      setDataSource({
        options: {
          baseUrl: '',
          connectionString: '',
          headers: ''
        },
        id: '',
        name: '',
        type: 'database',
        isEditing: true,
        createdAt: ''
      })
    );
  };

  return (
    <div className="w-full bg-white p-4 font-semibold flex flex-col">
      <div className="font-semibold text-sky-800 flex">
        Data Sources{' '}
        <div className="flex ml-2">
          {' '}
          {isEditing && (
            <>
              {' '}
              {'>'} <div className="flex ml-2"> {dataSource.type}</div>
            </>
          )}
        </div>
      </div>
      <div className="p-10 overflow-auto">
        {!isEditing && (
          <div className="overflow-auto">
            <div className="flex flex-row p-1 justify-center m-4 gap-2">
              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={RestAPILogo} alt="" />
                  RestAPI
                </div>
                <div
                  onClick={handleCreateApi}
                  className="bg-sky-200 hover:bg-sky-300 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded"
                >
                  + &nbsp; Add
                </div>
              </div>
              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-8 h-8" src={MongoDBLogo} alt="" />
                  MongoDB
                </div>
                <div
                  onClick={handleCreateDB}
                  className="bg-sky-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>

              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={BigQueryLogo} alt="" />
                  BigQuery
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>

              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={ClickHouseLogo} alt="" />
                  ClickHouse
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>

              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={CouchDBLogo} alt="" />
                  CouchDB
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>
            </div>
            <div className="flex flex-row p-1 justify-center m-4 gap-2">
              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={DynamoDBLogo} alt="" />
                  DynamoDB
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>

              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={ElasticSearchLogo} alt="" />
                  Elasticsearch
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>

              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={FirestoreLogo} alt="" />
                  Firestore
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>

              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={InfluxDBLogo} alt="" />
                  InfluxDB
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>

              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={MariaDBLogo} alt="" />
                  MariaDB
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>
            </div>
            <div className="flex flex-row p-1 justify-center m-4 gap-2">
              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={SQLServerLogo} alt="" />
                  SQL Server
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>

              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={MySQLLogo} alt="" />
                  MySQL
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>

              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={OracleDBLogo} alt="" />
                  Oracle DB
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>

              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={PostgreLogo} alt="" />
                  PostgreSQL
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>

              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={RedisDBLogo} alt="" />
                  Redis
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>
            </div>
            <div className="flex flex-row p-1 justify-center m-4 gap-2">
              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={ReThinkDBLogo} alt="" />
                  RethinkDB
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>

              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={SAPLogo} alt="" />
                  SAP HANA
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>

              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={SnowflakeLogo} alt="" />
                  Snowflake
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>

              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={TypeSenseLogo} alt="" />
                  TypeSense
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>

              <div className="border-solid border border-gray-300 rounded flex flex-col gap-4 h-40 w-40 justify-center items-center m-4">
                <div className="flex content-center items-center">
                  <img className="w-7 h-7 p-2 pl-0 pb-0" src={CosmosDBLogo} alt="" />
                  CosmosDB
                </div>
                <div className="bg-slate-200 text-gray-700 font-semibold text-sm outline:none py-1 px-7 border border-grey-500 rounded">
                  + &nbsp; Add
                </div>
              </div>
            </div>
          </div>
        )}
        {isEditing && (dataSource.type === 'api') && (
          <div>
            <RestAPIForm />
          </div>
        )}
        {isEditing && (dataSource.type === 'database') && (
          <div>
            <DataSourceForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default DataSourceManager;
