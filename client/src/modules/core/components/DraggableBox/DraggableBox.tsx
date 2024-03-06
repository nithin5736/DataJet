import { useEffect, useState } from 'react';
import { Rnd, RndDragCallback, RndResizeCallback } from 'react-rnd';

import useDesigner from '../../../shared/hooks/UseDesigner';
import { FormElementInstance, FormElements } from '../../Interface/FormElements';
import axios from 'axios';

interface BoxProps {
  element: FormElementInstance;
}
const Box: React.FC<BoxProps> = ({ element }) => {
  const { removeElement, setSelectedElement, updateElement } = useDesigner();

  const handleResize: RndResizeCallback = (
    _e: MouseEvent | TouchEvent,
    _direction: string,
    ref: HTMLElement,
    _delta: { width: number; height: number },
    _position: { x: number; y: number }
  ) => {
    const { offsetWidth, offsetHeight } = ref;

    if(element)
    setSelectedElement({...element, properties: {...element.properties, width: offsetWidth ,height: offsetHeight}});

    updateElement(element.name, {...element, properties: {...element.properties, width: offsetWidth ,height: offsetHeight}} );
  };


  const updatesizepatch = async () => {
    try{
      await axios.patch(`api/components/${element?.id}`, {
        properties: {...element?.properties}
    });
    } catch(err){
     console.log(err);
    }
  }

  const handleDragStop: RndDragCallback = (_e,d) => {
    if(element)
    setSelectedElement({...element, properties: {...element.properties, XPos: d.x ,YPos: d.y}});
    updateElement(element.name, {...element, properties: {...element.properties, XPos: d.x ,YPos: d.y}} );
  };
  useEffect(() => {
    updatesizepatch();
  },[element]);

  const handledeleteElement = async (element: FormElementInstance) => {
    try {
      console.log(element);
      removeElement(element.id);
      await axios.delete(`api/components/${element.id}`);
    } catch (err) {
      console.log('error');
    }
  }
  const DesignerElement = FormElements[element.type].editorComponent;

  const [isDeleteButtonVisible, setDeleteButtonVisible] = useState(false);

  return (
    <Rnd
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      size={{ width: element.properties.width, height: element.properties.height }}
      position={{x: element.properties.XPos, y: element.properties.YPos, }}
      default={{
        x: element.properties.XPos,
        y: element.properties.YPos,
        width: element.properties.width,
        height: element.properties.height
      }}
      bounds="#container"
      onResize={handleResize}
      onDragStop={handleDragStop}
      onMouseEnter={() => setDeleteButtonVisible(true)}
      onMouseLeave={() => setDeleteButtonVisible(false)}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setSelectedElement(element);
        }}
        style={{ position: 'relative' }}
      >
        {isDeleteButtonVisible && (
          <div className="flex justify-items-stretch">
            <div className=" text-lg">{element.name}</div>
            <div style={{ position: 'absolute', top: '1px', right: '5px', zIndex: 1 }}>
             
                <svg onClick={(e) => {
                  e.stopPropagation();
                  handledeleteElement(element);
                  setSelectedElement(null);
                }}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
            </div>
          </div>
        )}
        <DesignerElement element={element} height={element.properties.height} width={element.properties.width} />
      </div>
    </Rnd>
  );
};

export default Box;