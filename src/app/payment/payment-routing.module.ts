import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPaymentComponent } from './form-payment/form-payment.component';

const routes: Routes = [
  {
    path: '',
    component: FormPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
