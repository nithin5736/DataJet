import ButtonIcon from '../../../../assets/icons/ButtonIcon';
import Button, { ButtonProps } from '../../../UI/Button/Button';
import ButtonProperties from '../../../UI/Button/ButtonProperties';
import { ElementsType, FormElement, FormElementInstance } from '../../Interface/FormElements';

const type: ElementsType = 'Button';

export const ButtonComponentElement: FormElement = {
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
      properties: { ...properties, height: 40, width: 100 }
    }) as FormElementInstance,

  editorBtnElements: {
    icon: <ButtonIcon />,
    label: 'Button'
  },

  editorComponent: (props: ButtonProps) => <Button {...props} />,
  formComponent: () => <div>Button Properties</div>,
  propertiesComponent: () => <ButtonProperties />
};