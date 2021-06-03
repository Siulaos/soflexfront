import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClientName, Order } from 'src/app/pages/dashboard-page/models/order.model';
import { PathRest } from '../static/static';
// {
//   providedIn: 'root',
// }
@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    const path = PathRest.GET_ORDERS;
    return this.http.get<Order[]>(path);
  }

  getOrderById(id: number): Observable<Order> {
    const path = `${PathRest.GET_ORDER_BY_ID}/${id}`;
    return this.http.get<Order>(path);
  }

  getClients(): Observable<string[]>{
    const path = PathRest.GET_CLIENTS;
    return this.http.get<string[]>(path);
  }

  saveOrder(order: Order): Observable<Order> {
    const path = PathRest.POST_ORDER;
    return this.http.post<Order>(path, order);
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    const path = `${PathRest.PUT_ORDER}/${id}`;
    return this.http.put<Order>(path, order);
  }

  deleteOrderById(id: number) {
    const path = `${PathRest.DELETE_ORDER_BY_ID}/${id}`;
    return this.http.delete(path);
  }
}
