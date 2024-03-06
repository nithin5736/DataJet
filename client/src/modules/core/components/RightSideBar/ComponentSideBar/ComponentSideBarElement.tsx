import { FormElements } from '../../../Interface/FormElements';
import SideBarElements from '../SideBarElements';

function ComponentSideBarElement() {
  return (
    <>
      <div className="text-sky-700 text-xl p-4">Elements</div>
      <div className="flex flex-col gap-8 border-l-red-200 border-muted ml-5 mt-5">
        <div className="flex flex-1 gap-8">
          <SideBarElements formElement={FormElements.Button} />
          <SideBarElements formElement={FormElements.Table} />
          <SideBarElements formElement={FormElements.TextField} />
        </div>
        <div className="flex flex-1 gap-8">
          <SideBarElements formElement={FormElements.Form} />
        </div>
      </div>
    </>
  );
}

export default ComponentSideBarElement;
