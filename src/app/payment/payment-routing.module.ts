import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPaymentComponent } from './form-payment/form-payment.component';
import { ListPaymentsComponent } from './list-payments/list-payments.component';
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
    path: 'list',
    component: ListPaymentsComponent,
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
