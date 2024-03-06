import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { Input, Select, Space } from 'antd';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { setQuery } from '../.././reducers/core.reducer';

const { TextArea } = Input;
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const RestApiQuery: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setValue(newValue);
  };
  const [type, setType] = useState('GET');
  const [dataSourceName, setDataSourceName] = useState('');
  const dataSourcesList = useAppSelector((state) => state.core.dataSourcesList);
  // const [messageType, setMessageType] = useState<'success' | 'error' | null>(null); // 'success' or 'error'
  // const [messageText, setMessageText] = useState<string>('');

  const query = useAppSelector((state: any) => state.core.query);

  const dispatch = useDispatch();

  const handleQueryChange = () => {
    dispatch(
      setQuery({
        ...query,
        options: { ...query.options, type: type },
        isEditing: true
      })
    );
  };
  const handleTypeChange = (value: string) => {
    setType(value);
  };

  useEffect(() => {
    handleQueryChange();
    // console.log(type + baseUrl);
  }, [type]);

  // const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setBaseUrl(e.target.value);
  // };
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


  return (
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
        <div className="basis-5/6 flex py-3">
          <div className="py-0 pl-4 pr-8 text-gray-400 font-semibold">Request</div>
          <div className="basis-1/6 flex flex-col text-gray-800 font-semibold pr-10">
            <label className="pb-4">Method</label>
            <Space wrap style={{ backgroundColor: 'transparent' }}>
              <Select
                defaultValue={type}
                style={{ width: 120, height: 34, backgroundColor: 'transparent' }}
                onChange={handleTypeChange}
                options={[
                  { value: 'GET', label: 'GET' },
                  { value: 'POST', label: 'POST' },
                  { value: 'PUT', label: 'PUT' },
                  { value: 'PATCH', label: 'PATCH' },
                  { value: 'DELETE', label: 'DELETE' }
                ]}
              />
            </Space>
          </div>
          <div className="basis-5/6 flex flex-col text-gray-800 font-semibold">
            <label className="mb-4">Url</label>
            <Input
              addonBefore={query.options.baseUrl}
              value={query.options.path}
              onChange={(e) =>
                dispatch(
                  setQuery({ ...query, options: { ...query.options, path: e.target.value } })
                )
              }
              defaultValue=""
            />
          </div>
        </div>

        <div className="flex flex-col ml-24 h-full">
          <div className="flex h-full">
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab
                    label="Headers"
                    {...a11yProps(0)}
                    sx={{
                      textTransform: 'none',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      paddingLeft: '0px'
                    }}
                  />
                  <Tab
                    label="Params"
                    {...a11yProps(1)}
                    sx={{
                      textTransform: 'none',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      paddingLeft: '0px'
                    }}
                  />
                  <Tab
                    label="Body"
                    {...a11yProps(2)}
                    sx={{
                      textTransform: 'none',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      paddingLeft: '0px'
                    }}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <TextArea
                  value={query.options.headers}
                  onChange={(e) =>
                    dispatch(
                      setQuery({ ...query, options: { ...query.options, headers: e.target.value } })
                    )
                  }
                  // height={"800px"}
                  placeholder="Enter in Json"
                  rows={4}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <TextArea
                  value={query.options.params}
                  onChange={(e) =>
                    dispatch(
                      setQuery({ ...query, options: { ...query.options, params: e.target.value } })
                    )
                  }
                  // height={"800px"}
                  placeholder="Enter in Json"
                  rows={4}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                {/* <input
          type="text"
          value={query.options.body}
          onChange={(e) => (dispatch(setQuery({...query, options: {...query.options, body: e.target.value }})))}
          height={"800px"}
          className="block py-1 pl-3 w-full text-gray-900 placeholder:text-gray-400 focus:outline-none border-solid border border-gray-300 focus:ring-01 bg-transparent sm:text-sm sm:leading-6 rounded"
          placeholder="Enter in Json"
        /> */}
                <TextArea
                  value={query.options.body}
                  onChange={(e) =>
                    dispatch(
                      setQuery({ ...query, options: { ...query.options, body: e.target.value } })
                    )
                  }
                  placeholder="Enter in Json"
                  rows={4}
                />
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestApiQuery;