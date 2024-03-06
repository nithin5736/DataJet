import TableIcon from '../../../../assets/icons/TableIcon';
import TableProperties from '../../../UI/Table/TableProperties';
import TableUI, { TableProps } from '../../../UI/Table/TableUI';
import { ElementsType, FormElement, FormElementInstance } from '../../Interface/FormElements';

const type: ElementsType = 'Table';

export const TableComponentElement: FormElement = {
  type,

  construct: (
    id: string,
    name: string,
    properties: {
      XPos: number;
      YPos: number;
      height: number;
      width: number;
      extraAttributes: Record<string, any>;
    }
  ) =>
    ({
      id,
      type,
      name,
      properties
    }) as FormElementInstance,

  editorBtnElements: {
    icon: <TableIcon />,
    label: 'Table'
  },

  editorComponent: (props: TableProps) => <TableUI {...props} />,
  formComponent: () => <div>Table Properties</div>,
  propertiesComponent: () => <TableProperties />
};