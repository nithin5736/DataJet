import React from 'react';
import TextArea from 'antd/es/input/TextArea';

export interface TextFieldProps {
  height: number;
  width: number;
}
const TextFieldUI: React.FC<TextFieldProps> = ({ height, width }) => {
  return (
    <TextArea
      className="bg-white"
      style={{ height: height, width: width }}
      placeholder="Input Text"
      autoSize
    />
  );
};

export default TextFieldUI;
