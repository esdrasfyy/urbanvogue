export interface inputProps {
    type: string;
    label: string;
    name: string;
    register: Function;
    change?: Function;
    maxLength?: number;
    minLength?: number
    required?: boolean;
    autofocus?: boolean;
    disabled?: boolean;
    classname?: string;
    pleaceholder: string;
    error?: any;
    value?: string;
    defaultvalue?: any;
  }