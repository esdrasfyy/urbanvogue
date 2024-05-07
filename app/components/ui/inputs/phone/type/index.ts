export interface PhoneUiProps {
    label: string;
    name: string;
    register: Function;
    focus?: Function;
    change?: Function;
    handleCountry: Function;
    country: string;
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