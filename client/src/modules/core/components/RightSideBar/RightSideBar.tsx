import useDesigner from '../../../shared/hooks/UseDesigner';
import ComponentSideBarElement from './ComponentSideBar/ComponentSideBarElement';
import PropertiesSideBar from './ComponentSideBar/PropertiesSideBar';

function RightSideBar() {
  const { selectedElement } = useDesigner();

  return (
    <div className="h-full bg-gray-100 m-0">
      {!selectedElement && <ComponentSideBarElement />}
      {selectedElement && <PropertiesSideBar />}
    </div>
  );
}

export default RightSideBar;
