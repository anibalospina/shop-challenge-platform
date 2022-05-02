import { Component, OnInit } from '@angular/core';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { DataPaginated } from '../models/data-paginated';
import { Order } from '../models/order';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-list-payments',
  templateUrl: './list-payments.component.html',
  styleUrls: ['./list-payments.component.scss'],
})
export class ListPaymentsComponent implements OnInit {
  public showLoader: boolean = false;
  public columns = ['Nombre', 'Correo electrónico', 'Celular', 'Estado', 'Ver'];
  public data: Order[] = [];
  public length = 0;
  public index = 0;

  goToPage(index: number): void {
    this.getOrders(index + 1);
  }

  constructor(
    private paymentService: PaymentService,
    private notificationsService: TuiNotificationsService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(page: number = 1) {
    this.showLoader = true;

    this.paymentService.getOrders(page).subscribe({
      next: (dataPaginated: DataPaginated<Order>) => {
        this.showLoader = false;
        this.data = dataPaginated.data;
        this.length = Math.ceil(dataPaginated.total / dataPaginated.per_page);
        this.index = dataPaginated.current_page - 1;
      },
      error: () => {
        this.showLoader = false;

        this.notificationsService
          .show('Hubo un error al cargar las ordenes.', {
            status: TuiNotification.Error,
          })
          .subscribe();
      },
    });
  }
}
