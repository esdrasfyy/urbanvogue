export interface buttonPassUiProps {
    show: boolean;
    disabled?: boolean;
    name: string;
    label: string;
    classname: string;
    register: Function;
    handleClick: () => void;
    error?: string;
    defaultvalue?: string;
  }