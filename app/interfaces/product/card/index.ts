export interface ImageI {
    url: string;
  }
  
  interface Detail {
    detail: string;
  }
  
  interface Size {
    size: string;
  }
  
  interface Flag {
    flag: string;
  }
  interface Color {
    name_color: string;
  }
  
  export interface ProductPageI {
    id: number;
    title: string;
    summary: string;
    quantidy: number;
    sold: number;
    price: string;
    state: boolean;
    category: string;
    brand: string;
    guarantee: string;
    assessment: number;
    qtd_assessment: number;
    parcelable: boolean;
    max_installments: number;
    interest_rate: number;
    updated_at: string;
    created_at: string;
    createdAt: string;
    updatedAt: string;
    images: ImageI[];
    colors: Color[];
    details: Detail[];
    sizes: Size[];
    flags: Flag[];
    rating: number
    quantityRatings: number
    percentage: number
    quantityRecommends:number
  }
  export interface ProductI {
    id: number;
    title: string;
    summary: string;
    quantidy: number;
    sold: number;
    price: string;
    state: boolean;
    category: string;
    brand: string;
    guarantee: string;
    assessment: number;
    qtd_assessment: number;
    parcelable: boolean;
    max_installments: number;
    interest_rate: number;
    images: ImageI[];
    colors: Color[];
    sizes: Size[];
  }
