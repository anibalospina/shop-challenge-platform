import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { FormPaymentComponent } from './form-payment/form-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { TuiFilterByInputPipeModule } from '@taiga-ui/kit';
import { TuiErrorModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiInputPhoneInternationalModule } from '@taiga-ui/kit';
import { TuiLabelModule } from '@taiga-ui/core';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiInputInlineModule } from '@taiga-ui/kit';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import { TuiInputNumberModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [FormPaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TuiInputModule,
    TuiFieldErrorPipeModule,
    TuiFilterByInputPipeModule,
    TuiErrorModule,
    TuiInputPhoneInternationalModule,
    TuiLabelModule,
    TuiIslandModule,
    TuiButtonModule,
    TuiCurrencyPipeModule,
    TuiInputNumberModule,
    TuiLoaderModule,
  ],
})
export class PaymentModule {}
