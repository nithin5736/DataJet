import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useDesigner from '../../../shared/hooks/UseDesigner';
import StaticBox from '../DraggableBox/StaticBox';
import axios from 'axios';

const StaticContainer: React.FC = () => {
  const { elements, setElements } = useDesigner();
  const { id } = useParams();
  const fetchComponent = async () => {
    try {
      const response = await axios.get(`api/components/publish?userId=${id}`);
      setElements(response.data);
    } catch (err) {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchComponent();
  }, []);

  return (
    <div
      className=" overflow-hidden"
      id="container"
      style={{
        height: '100vh',
        width: '100%'
      }}
    >
      <div className="bg-slate-300 w-full h-full flex flex-col items-center justify-start flex-1 ">
        {elements.length > 0 && elements.map((e) => <StaticBox key={e.id} element={e} />)}
      </div>
    </div>
  );
};

export default StaticContainer;
