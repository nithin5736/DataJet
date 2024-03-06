import React, { useEffect, useState } from 'react';
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';

import useDesigner from '../../../shared/hooks/UseDesigner';
import { ElementsType, FormElementInstance, FormElements } from '../../Interface/FormElements';
import { idGenerator } from '../../utils/IdGenerator';
import DraggableBox from '../DraggableBox/DraggableBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';

const Container: React.FC = () => {
  interface MousePostion {
    x: number;
    y: number;
  }

  const [mousePos, setMousePos] = useState<MousePostion>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const { elements, addElement, selectedElement, setSelectedElement, setElements, updateElement } =
    useDesigner();
  const user = useAppSelector((state) => state.auth.user)
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true
    }
  });

  const fetchComponent = async () => {
    try {
      const response = await axios.get('api/components');
      setElements(response.data);
    } catch (err) {
      console.log('error');
    }
  };

  const postComponent = async (newElement: FormElementInstance) => {
    try {
      addElement(0, newElement);
      // console.log(newElement);
      const response = await axios.post('api/components', {
        ...newElement, data: {}, isVisible: false
      });
      console.log("new element  ",response);
      updateElement(newElement.name, response.data);
    } catch (error) {
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
      console.log('error');
    }
  };

  useDndMonitor({
    onDragEnd: async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        console.log('mousee  ', mousePos.x, mousePos.y);

        const newElement = FormElements[type as ElementsType].construct(
          idGenerator(),
          `${user.name}${type}${elements.length}`,
          {
            XPos: mousePos.x - 100,
            YPos: mousePos.y - 50,
            height: 280,
            width: 800,
            extraAttributes: {}
          }
        );
        postComponent({ ...newElement });
      }
    }
  });
  useEffect(() => {
    fetchComponent();
    // console.log("this one   ",elements.properties.width);
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
      <div
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
        ref={droppable.setNodeRef}
        className="bg-slate-300 w-full h-full flex flex-col items-center justify-start flex-1 "
      >
        {!droppable.isOver && elements.length === 0 && (
          <div className="bg-slate-200  border-2 border-sky-900 flex mt-40 items-center justify-center rounded">
            <div className="flex justify-center items-center p-10">
              <p className=" text-center font-light ">
                You haven't added any components yet. Drag and Drop the components from the right
                components side bar
              </p>
            </div>
          </div>
        )}
        {elements.length > 0 && elements.map((e) => <DraggableBox key={e.id} element={e} />)}
      </div>
    </div>
  );
};

export default Container;
