import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './modules/auth.module';
import { DashboardModule } from './modules/dashboard.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthModule, DashboardModule],
  exports: [AuthModule, DashboardModule],
})
export class PageModule {}
