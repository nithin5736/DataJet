import { Input } from 'antd';

import useDesigner from '../../shared/hooks/UseDesigner';

function FormProperties() {
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
      <div className="text-xl text-sky-700 mb-6">Form Properties</div>
      <div>
        <div className="font-semibold text-sky-700 mb-1">Form Name</div>
        <Input
          defaultValue={selectedElement?.name}
          placeholder="Change Form Name"
          value={selectedElement?.name}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
}

export default FormProperties;