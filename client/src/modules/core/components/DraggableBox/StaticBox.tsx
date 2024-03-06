import { Rnd } from 'react-rnd';

import { FormElementInstance, FormElements } from '../../Interface/FormElements';

interface BoxProps {
  element: FormElementInstance;
}
const StaticBox: React.FC<BoxProps> = ({ element }) => {
  const DesignerElement = FormElements[element.type].editorComponent;

  const resizeDirections = {
    bottom: false,
    bottomLeft: false,
    bottomRight: false,
    left: false,
    right: false,
    top: false,
    topLeft: false,
    topRight: false
  };

  return (
    <Rnd
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      disableDragging
      enableResizing={resizeDirections} // to disable
      size={{ width: element.properties.width, height: element.properties.height }}
      position={{ x: element.properties.XPos, y: element.properties.YPos }}
      default={{
        x: element.properties.XPos,
        y: element.properties.YPos,
        width: element.properties.width,
        height: element.properties.height
      }}
    >
      <div style={{ position: 'relative' }}>
        <DesignerElement
          element={element}
          height={element.properties.height}
          width={element.properties.width}
        />
      </div>
    </Rnd>
  );
};

export default StaticBox;
