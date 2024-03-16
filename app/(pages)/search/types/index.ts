export interface Inputs{
    min?: number;
    max?: number;
  };
  export interface FiltersI {
    sizes: { [size: string]: number };
    colors: { [color: string]: number };
    categories: { [category: string]: number };
    brands: { [brand: string]: number };
}