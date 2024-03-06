import { useState } from 'react';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';

import { ElementsType, FormElements } from '../../Interface/FormElements';
import { SideBarElementsOverlay } from '../RightSideBar/SideBarElements';

function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      console.log('This is dragging', event);
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    }
  });

  if (!draggedItem) return null;

  let node = <div>No Drag overlay re bhau</div>;
  const isDesignerBtnELement = draggedItem?.data.current?.isDesignerBtnElement;

  if (isDesignerBtnELement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SideBarElementsOverlay formElement={FormElements[type]} />;
  }
  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
