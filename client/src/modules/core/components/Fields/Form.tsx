import FormIcon from '../../../../assets/icons/FormIcon';
import FormProperties from '../../../UI/Form/FormProperties';
import FormUI, { FormProps } from '../../../UI/Form/FormUI';
import { ElementsType, FormElement, FormElementInstance } from '../../Interface/FormElements';

const type: ElementsType = 'Form';

export const FormComponentElement: FormElement = {
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
      properties: { ...properties, height: 110, width: 200 }
    }) as FormElementInstance,

  editorBtnElements: {
    icon: <FormIcon />,
    label: 'Form'
  },

  editorComponent: (props: FormProps) => <FormUI {...props} />,
  formComponent: () => <div>Button Properties</div>,
  propertiesComponent: () => <FormProperties />
};