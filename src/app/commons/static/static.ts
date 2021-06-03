import { environment } from 'src/environments/environment';
export class PathRest {
  static readonly GET_LOGIN = 'auth/login';
  static readonly GET_ORDERS = environment.hostBackend + 'orders';
  static readonly GET_ORDER_BY_ID = environment.hostBackend + 'orders';
  static readonly GET_CLIENTS = environment.hostBackend + 'clientNames';
  static readonly POST_ORDER = environment.hostBackend + 'orders';
  static readonly PUT_ORDER = environment.hostBackend + 'orders';
  static readonly DELETE_ORDER_BY_ID = environment.hostBackend + 'orders';
}
