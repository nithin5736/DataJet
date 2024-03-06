import { SetStateAction, useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { restapiRun } from '../../core/components/Querypanel/restapiRun';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import useDesigner from '../../shared/hooks/UseDesigner';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { mongodbRun } from '../../core/components/Querypanel/mongodbRun';

const { TextArea } = Input;

function TableProperties() {
  const [queryResponse, setQueryResponse] = useState({ data: '' });
  const queriesList = useAppSelector((state) => state.core.queriesList);
  const dataSourceList = useAppSelector((state) => state.core.dataSourcesList);

  const { selectedElement, setSelectedElement, updateElement } = useDesigner();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement) {
      updateElement(selectedElement.name, { ...selectedElement, name: event.target.value });
      setSelectedElement({ ...selectedElement, name: event.target.value });
    }
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement) {
      updateElement(selectedElement.name, {
        ...selectedElement,
        data: { ...selectedElement.data, query: event.target.value}
      });
      setSelectedElement({
        ...selectedElement,
        data: { ...selectedElement.data, query: event.target.value }
      });
    }
  };

  const handleSave = async () => {
    try {
      if (selectedElement) {
        updateElement(selectedElement.name, selectedElement);
        console.log("selected element ",selectedElement);
        await axios.patch(`api/components/${selectedElement.id}`, {
          name: selectedElement.name,
          properties: selectedElement.properties,
          data: selectedElement.data
        });
      }
      toast.success('Changes Saved', {
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
      console.log(error);
      toast.error(`${error}`, {
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
  };

  const handlequeryrun = async () => {
  if (selectedElement) {
  setSelectedElement({
    ...selectedElement,
    data: {
      ...selectedElement.data,
      text: ''
    }
  });

  updateElement(selectedElement.name, selectedElement);
  }
    const result = queriesList.find((query) => {
      if (query.name === selectedElement?.data.query) {
        return query;
      }
    });
    const datasource = dataSourceList.find((dataSource) => {
      if (dataSource.id === result?.datasourceId) {
        // setQuery(query);
        return dataSource;
      }
    });

    if (result) {

      if(datasource?.type === 'api')
      {
        const res = (await restapiRun(result)) as { data: SetStateAction<{ data: string }> };
        // console.log('now u see me  ',res);
        if (res && selectedElement) {
        setQueryResponse(res.data);
        setSelectedElement({
          ...selectedElement,
          properties: {
            ...selectedElement.properties,
            extraAttributes: { ...selectedElement.properties.extraAttributes, data: res.data}
          },
          data: { ...selectedElement.data, text: JSON.stringify(res.data), querydata: result }
        });
        updateElement(selectedElement.name, selectedElement);
        console.log("sd  ",selectedElement?.data.query, "sd res   ",result,"  bc yaar ",res);
      }
     }else {
      console.log('now u see me  ', datasource?.type);

      const res = (await mongodbRun(result)) as { data: SetStateAction<{ data: string }> };
      console.log('now u see me  ',res);
      if (res && selectedElement) {
        setQueryResponse(res.data);
        setSelectedElement({
          ...selectedElement,
          properties: {
            ...selectedElement.properties,
            extraAttributes: { ...selectedElement.properties.extraAttributes, data: res.data}
          },
          data: { ...selectedElement.data, text: JSON.stringify(res.data), querydata: result }
        });
        updateElement(selectedElement.name, selectedElement);
     }
    }
    }else {
      toast.error('No query found', {
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
  };

  useEffect(() => {
    setSelectedElement(selectedElement);
    if (selectedElement) {
      updateElement(selectedElement.name, selectedElement);
    }
    // handleSave();
  }, [queryResponse]);

  return (
    <div className="flex flex-col">
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
      <div className="text-xl text-sky-700 p-4">Table Properties</div>
      <div className="p-4">
        <p className="text-sky-700 text-lg">Table Name</p>
        <Input
          defaultValue={selectedElement?.name}
          placeholder="Table Name"
          value={selectedElement?.name}
          onChange={handleNameChange}
          // onPressEnter={handlePressEnter}
        />
      </div>
      <div className="p-4">
        <p className="text-sky-700 text-lg">Data</p>
        <TextArea
          defaultValue={selectedElement?.data?.text}
          rows={9}
          value={selectedElement?.data?.text}
          // onChange={handleDataChange}
        />
        <div className="pt-2">
          {/* <Button type="primary" onClick={handleSubmitData}>
            Submit Data
          </Button> */}
        </div>
      </div>
      <div className="p-4">
        <p className="text-sky-700 font-semibold mb-2">Query Name</p>
        <Input
          defaultValue={selectedElement?.data?.query}
          placeholder="Enter Query name"
          value={selectedElement?.data?.query}
          onChange={handleQueryChange}
        />
        <div className="pt-2">
          <Button type="primary" onClick={handlequeryrun}>
            Run Query
          </Button>
        </div>
      </div>
      <Button type="primary" className="m-4" onClick={handleSave}>
        Save changes
      </Button>
    </div>
  );
}

export default TableProperties;
