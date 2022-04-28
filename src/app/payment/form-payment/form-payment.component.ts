import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';
import { TUI_NUMBER_FORMAT } from '@taiga-ui/core';

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

  constructor(private formBuilder: FormBuilder) {}

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
}
