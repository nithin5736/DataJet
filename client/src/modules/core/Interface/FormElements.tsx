import { ReactNode } from 'react';

import { ButtonComponentElement } from '../components/Fields/Button';
import { FormComponentElement } from '../components/Fields/Form';
import { TableComponentElement } from '../components/Fields/Table';
import { TextFieldComponentElement } from '../components/Fields/TextField';

export type ElementsType = 'Button' | 'Table' | 'TextField' | 'Form';

interface EditorComponentProps {
  element: FormElementInstance;
  height: number;
  width: number;
}

export interface FormElement {
  type: ElementsType;

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
  ) => FormElementInstance;

  editorBtnElements: {
    icon: ReactNode;
    label: string;
  };

  editorComponent: React.FC<EditorComponentProps>;
  formComponent: React.FC;

  propertiesComponent: React.FC;
}

export interface FormElementInstance {
  id: string;
  type: ElementsType;
  name: string;
  properties: {
    XPos: number;
    YPos: number;
    height: number;
    width: number;
    extraAttributes: Record<string, any>;
  };
  data: Record<string, any>;
  createdAt: string;
}

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  Button: ButtonComponentElement,
  Table: TableComponentElement,
  TextField: TextFieldComponentElement,
  Form: FormComponentElement
};