import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';
import {
  TuiNotification,
  TuiNotificationsService,
  TUI_NUMBER_FORMAT,
} from '@taiga-ui/core';
import { PaymentService } from '../payment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentRequest } from '../models/payment-request';

@Component({
  selector: 'app-form-payment',
  templateUrl: './form-payment.component.html',
  styleUrls: ['./form-payment.component.scss'],
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
export class FormPaymentComponent implements OnInit {
  public showLoader: boolean = false;
  readonly countries = Object.values(TuiCountryIsoCode);
  countryIsoCode = TuiCountryIsoCode.CO;

  public payForm = this.formBuilder.group({
    customerName: ['', [Validators.required]],
    customerEmail: ['', [Validators.required, Validators.email]],
    customerMobile: ['', [Validators.required]],
    description: [
      'Curso Laravel + Angular + PlaceToPlay',
      [Validators.required],
    ],
    total: ['100', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService
  ) {}

  ngOnInit(): void {}

  get customerName() {
    return this.payForm.get('customerName') as FormControl;
  }

  get customerEmail() {
    return this.payForm.get('customerEmail') as FormControl;
  }

  get customerMobile() {
    return this.payForm.get('customerMobile') as FormControl;
  }

  get description() {
    return this.payForm.get('description') as FormControl;
  }

  get total() {
    return this.payForm.get('total') as FormControl;
  }

  createRequest() {
    this.showLoader = true;

    this.paymentService
      .createRequest(
        this.customerName.value,
        this.customerEmail.value,
        this.customerMobile.value,
        this.description.value,
        this.total.value,
        'USD'
      )
      .subscribe({
        next: (paymentRequest: PaymentRequest) => {
          this.showLoader = false;

          this.notificationsService
            .show('Redireccionando para realizar el pago ...')
            .subscribe();

          if (paymentRequest && paymentRequest?.processUrl) {
            window.location.href = paymentRequest?.processUrl;
          } else {
            this.notificationsService
              .show(
                'No se pudo redireccionar a la pagina de pago, intente nuevamente',
                {
                  status: TuiNotification.Error,
                }
              )
              .subscribe();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.showLoader = false;
          console.log(error);
        },
      });
  }
}
