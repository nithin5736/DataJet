import Container from '../../components/Container/Container';
import DragOverlayWrapper from '../../components/DragOverlay/DragOverlayWrapper';
import RightSideBar from '../../components/RightSideBar/RightSideBar';

function Editor() {
  return (
    // <div className="flex w-screen h-screen flex-grow overflow-hidden absolute flex-1">
    // <div style={{
    //   width : '80%'
    // }}>
    //   <Container />
    //   <DragOverlayWrapper />
    // </div>
    // <div style={{
    //   width : '20%'
    // }}>
    //   <RightSideBar />
    // </div>
    // </div>

    <div className="flex flex-col sm:flex-row h-screen">
      <div className="flex-grow relative overflow-hidden">
        <Container />
        <DragOverlayWrapper />
      </div>
      <div className="sm:w-80 bg-gray-200">
        <RightSideBar />
      </div>
    </div>
  );
}

export default Editor;
