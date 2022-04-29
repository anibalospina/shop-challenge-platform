import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPaymentComponent } from './form-payment/form-payment.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: FormPaymentComponent,
  },
  {
    path: ':id',
    component: PaymentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
