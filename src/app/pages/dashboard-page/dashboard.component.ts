import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmDialogService } from 'src/app/commons/services/confirm-dialog.service';
import { OrderService } from 'src/app/commons/services/order.service';
import { LocalStorageJwt } from 'src/app/commons/static/local-storage';
import { ChannelOrderService } from './../../commons/services/channelOrder.service';
import { Order } from './models/order.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  constructor(
    private router: Router,
    private orderService: OrderService,
    private channelOrder: ChannelOrderService,
    private confirmDialogService: ConfirmDialogService
  ) {}

  orderServiceSuscribe: Subscription | undefined;

  ngOnInit(): void {
    this.getOrders();
    this.channelOrder.chanelBadge.subscribe((data) => {
      if (data) {
        this.getOrders();
      }
    });
  }

  getOrders(): void {
    this.orderServiceSuscribe = this.orderService
      .getOrders()
      .subscribe((data) => {
        this.orders = data.filter((x) => x.deleted == 0);
      });
  }

  ngOnDestroy(): void {
    this.orderServiceSuscribe?.unsubscribe();
  }

  clickAdd(): void {
    this.router.navigateByUrl('dashboard/create-order');
  }

  clickLogOut() : void {
    this.router.navigateByUrl('login');
  }

  clickDelete(id: number, order: Order): void {
    const rol = localStorage.getItem(LocalStorageJwt.LS_ROL);
    if (rol === '1') {
      this.showDialog(id, order);
    } else {
      alert('Usted no tiene permitido eliminar el pedido');
    }
  }

  showDialog(id: number, order: Order) {
    this.confirmDialogService.confirmThis(
      'Está seguro?',
       () => {
        this.delete(id, order);
      },
      function () {
        console.log('Cancelado');
      }
    );
  }

  delete(id: number, order: Order) {
    order.deleted = 1;
    this.orderService.updateOrder(id, order).subscribe((data) => {
      this.getOrders();
      this.router.navigateByUrl('dashboard');
    });
  }
}

