import { Component, OnInit } from '@angular/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { TUI_NUMBER_FORMAT } from '@taiga-ui/core';
import { PaymentService } from '../payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderRequest } from '../models/order-request';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Este campo es obligatorio',
        email: 'Este campo no es un correo electrónico valido',
      },
    },
    {
      provide: TUI_NUMBER_FORMAT,
      useValue: { decimalSeparator: ',', thousandSeparator: '.' },
    },
  ],
})
export class PaymentComponent implements OnInit {
  public showLoader: boolean = false;
  public orderRequest: OrderRequest | undefined;
  public secondsToNextPayment = 30;

  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.getRequestPayment(Number(params.get('id')));
    });
  }

  getRequestPayment(id: number) {
    this.showLoader = true;

    this.paymentService.getRequestPayment(id).subscribe({
      next: (orderRequest: OrderRequest) => {
        this.showLoader = false;
        this.orderRequest = orderRequest;

        if (this.orderRequest.status === 'CREATED') {
          setInterval(() => {
            this.secondsToNextPayment--;
            if (this.secondsToNextPayment === 0) {
              location.reload();
              this.secondsToNextPayment = 30;
            }
          }, 1000);
        }
      },
      error: () => (this.showLoader = false),
    });
  }

  goToCreate() {
    this.router.navigate(['payments/create']);
  }

  retryPayment() {
    if (this.orderRequest) {
      window.location.href = this.orderRequest.processUrl;
    }
  }
}
