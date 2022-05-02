import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataPaginated } from './models/data-paginated';
import { Order } from './models/order';
import { OrderRequest } from './models/order-request';
import { PaymentRequest } from './models/payment-request';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpClient: HttpClient) {}

  createRequest(
    customerName: string,
    customerEmail: string,
    customerMobile: string,
    description: string,
    total: string,
    currency: string = 'USD'
  ): Observable<PaymentRequest> {
    return this.httpClient.post<PaymentRequest>(`${environment.api}/orders`, {
      customerName,
      customerEmail,
      customerMobile,
      description,
      total,
      currency,
    });
  }

  getRequestPayment(id: number): Observable<OrderRequest> {
    return this.httpClient.get<OrderRequest>(
      `${environment.api}/orders/payment-request/${id}`
    );
  }

  getOrders(page: number = 1): Observable<DataPaginated<Order>> {
    return this.httpClient.get<DataPaginated<Order>>(
      `${environment.api}/orders`,
      { params: { page } }
    );
  }
}
