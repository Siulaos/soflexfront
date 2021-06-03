import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from '../dashboard-page/dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEditOrderComponent } from '../dashboard-page/components/order/order.component';
import { OrderService } from 'src/app/commons/services/order.service';
import { DashboardComponent } from '../dashboard-page/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from 'src/app/commons/components/confirm-dialog/confirm-dialog.component';
@NgModule({
  declarations: [
    CreateEditOrderComponent,
    DashboardComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
  ],
  exports: [CreateEditOrderComponent, DashboardComponent],
  providers: [OrderService],
})
export class DashboardModule {}
