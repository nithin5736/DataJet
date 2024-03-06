import { Input } from 'antd';

import useDesigner from '../../shared/hooks/UseDesigner';

function ButtonProperties() {
  const { selectedElement, setSelectedElement, updateElement } = useDesigner();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement != null) {
      setSelectedElement({ ...selectedElement, name: event.target.value });
      updateElement(selectedElement.name, { ...selectedElement, name: event.target.value });
      setSelectedElement({ ...selectedElement, name: event.target.value });
      updateElement(selectedElement.name, { ...selectedElement, name: event.target.value });
    }
  };

  return (
    <div className="flex flex-col p-4">
      <div className="text-xl text-sky-700">Button Properties</div>
      <div className="mt-4">
        <div className="font-semibold text-sky-700 pb-2">Button Name</div>
        <Input
          defaultValue={selectedElement?.name}
          placeholder="Change Button Name"
          value={selectedElement?.name}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
}

export default ButtonProperties;