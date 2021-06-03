import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtAuthGuard } from 'src/app/commons/guards/auth.guard';
import { CreateEditOrderComponent } from './components/order/order.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [JwtAuthGuard],
    children: [
      {
        path: 'create-order',
        component: CreateEditOrderComponent,
      },
      {
        path: 'edit-order/:id',
        component: CreateEditOrderComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
