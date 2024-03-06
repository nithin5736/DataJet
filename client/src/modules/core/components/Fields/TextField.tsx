import TextFieldIcon from '../../../../assets/icons/TextFieldIcon';
import TextFieldProperties from '../../../UI/TextField/TextFieldProperties';
import TextFieldUI, { TextFieldProps } from '../../../UI/TextField/TextFieldUI';
import { ElementsType, FormElement, FormElementInstance } from '../../Interface/FormElements';

const type: ElementsType = 'TextField';

export const TextFieldComponentElement: FormElement = {
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
      properties: { ...properties, height: 100, width: 200 }
    }) as FormElementInstance,

  editorBtnElements: {
    icon: <TextFieldIcon />,
    label: 'TextField'
  },

  editorComponent: (props: TextFieldProps) => <TextFieldUI {...props} />,
  formComponent: () => <div>Button Properties</div>,
  propertiesComponent: () => <TextFieldProperties />
};