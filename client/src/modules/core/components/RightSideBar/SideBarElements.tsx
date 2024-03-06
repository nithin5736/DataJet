import { useDraggable } from '@dnd-kit/core';

import { FormElement } from '../../Interface/FormElements';

function SideBarElements({ formElement }: { formElement: FormElement }) {
  // const {label , icon} = formElement.editorBtnElements;
  const icon = formElement.editorBtnElements.icon;
  const label = formElement.editorBtnElements.label;
  const dragable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true
    }
  });
  return (
    <div ref={dragable.setNodeRef} {...dragable.listeners} {...dragable.attributes}>
      <div className="flex flex-col h-[60px] w-[60px] bg-white border border-gray-300 border-solid rounded-lg">
        <div className="h-[30px] items-center justify-center flex">{icon}</div>
        <div className="text-sm flex items-center justify-center ">{label}</div>
      </div>
    </div>
  );
}

export function SideBarElementsOverlay({}: { formElement: FormElement }) {
  return (
    <div className="flex flex-col gap-2 h-[50px] w-[100px] bg-blue-400 border-10 border-black"></div>
  );
}

export default SideBarElements;
