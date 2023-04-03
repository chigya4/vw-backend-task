export interface CompanyData {
  name: string;
  phone: number;
}

export interface CustomerData {
  firstName?: string;
  lastName?: string;
  zipCode?: number;
  mail?: string;
}

export interface CheckoutData {
  id: string;
  companyData: CompanyData;
  customerData?: CustomerData;
}

export interface CustomerDataBody {
  customerData?: CustomerData
}

export interface CompanyDataBody {
  companyData?: CompanyData
}

