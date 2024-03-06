// import React from 'react'
import { DndContext } from '@dnd-kit/core';

import DesignerContextProvider from '../../components/Context/DesignerContext';
import Editor from './Editor';

// import DragOverlayWrapper from '../../components/DragOverlay/DragOverlayWrapper'

function EditorHome() {
  return (
    <DesignerContextProvider>
      <DndContext>
        <Editor />
      </DndContext>
    </DesignerContextProvider>
  );
}

export default EditorHome;
