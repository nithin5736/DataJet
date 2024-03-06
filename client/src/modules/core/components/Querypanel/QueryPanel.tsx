import React from 'react';

import QueryDataPane from './QueryDataPane';
import QueryManager from './QueryManager';

const QueryPanel: React.FC = () => {
  return (
    <>
      <div
        className="flex flex-row p-0 border-solid border border-gray-300"
        style={{ height: '275px',width:'1200px' }}
      >
        <div className="basis-1/4 border-solid border-r border-0 border-gray-300">
          <QueryDataPane />
        </div>
        <div className="basis-3/4 ">
          <QueryManager />
        </div>
      </div>
    </>
  );
};

export default QueryPanel;