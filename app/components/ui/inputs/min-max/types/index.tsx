export interface MinMaxProps {
    type: string;
    label: string;
    name: string;
    maxLength?: number;
    minLength?: number
    required?: boolean;
    disabled?: boolean;
    classname?: string;
    pleaceholder: string;
    value?: string;
    defaultvalue?: any;
    handleMinMax: Function
  }