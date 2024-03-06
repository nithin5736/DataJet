import useDesigner from '../../../../shared/hooks/UseDesigner';
import { FormElements } from '../../../Interface/FormElements';

function PropertiesSideBar() {
  const { selectedElement } = useDesigner();
  if (!selectedElement) return null;

  const Properties = FormElements[selectedElement?.type].propertiesComponent;
  return <Properties />;
}

export default PropertiesSideBar;
