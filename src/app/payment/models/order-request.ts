export interface OrderRequest {
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  description: string;
  total: number;
  processUrl: string;
  currency: string;
  status: string;
}
