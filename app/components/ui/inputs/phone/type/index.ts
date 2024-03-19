export interface PhoneUiProps {
    label: string;
    name: string;
    register: Function;
    focus?: Function;
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