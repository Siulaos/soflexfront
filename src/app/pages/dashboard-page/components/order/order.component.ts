import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/commons/services/order.service';
import {
  IClientName,
  IProduct,
  Order,
} from 'src/app/pages/dashboard-page/models/order.model';

import { ChannelOrderService } from './../../../../commons/services/channelOrder.service';
import { TypeState } from './../../models/product.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class CreateEditOrderComponent implements OnInit, OnDestroy {
  orderForm!: FormGroup;
  isAddMode!: boolean;
  id!: string;
  clientNames: string[] = [];
  productsFinal: IProduct[] = [];
  demo = true;
  orderServiceSuscribe: Subscription | undefined;
  idProduct = 0;

  disabledButtonSave = false;
  disabledButtonEdit = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private channelOrder: ChannelOrderService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    //A mejorar con folkjoin
    this.orderService.getClients().subscribe((c) => {
      this.clientNames = c;
      console.log(this.clientNames);
      if (!this.isAddMode) {
        this.orderService.getOrderById(+this.id).subscribe((order) => {
          this.setForm(order);
        });
      }
    });
  }

  private setForm(order: Order) {
    //patchValue no automatiza los arrays, asi se hace manualmente.
    let products = new FormArray([]);
    order.products.forEach((p) => {
      let product = new FormGroup({
        id: new FormControl(p.id, Validators.required),
        name: new FormControl(p.name, Validators.required),
        quantity: new FormControl(p.quantity, Validators.required),
        price: new FormControl(p.price, Validators.required),
        state: new FormControl('save'),
      });
      products.push(product);
    });
    this.orderForm = this.fb.group({
      id: new FormControl(order.id, Validators.required),
      date: new FormControl(order.date, Validators.required),
      clientName: new FormControl(order.clientName, Validators.required),
      deleted: new FormControl(order.deleted),
      products: products,
    });

    this.productsFinal = order.products;
  }

  private buildForm() {
    this.orderForm = this.fb.group({
      id: [null],
      date: [new Date(), Validators.required],
      clientName: [[''], Validators.required],
      deleted: [0],
      products: this.fb.array([
        new FormGroup({
          id: new FormControl(this.idProduct++, Validators.required),
          name: new FormControl('', Validators.required),
          quantity: new FormControl('', Validators.required),
          price: new FormControl('', Validators.required),
          state: new FormControl(''),
        }),
      ]),
    });

    this.products.valueChanges.subscribe((data) => {});
  }

  ngOnDestroy(): void {
    this.orderServiceSuscribe?.unsubscribe();
  }

  onSubmit(): void {
    if (this.orderForm.invalid || this.productsFinal.length === 0) {
      return;
    } else {
      this.router.navigateByUrl('dashboard');
    }
  }

  changeDate(e: Event): void {}

  clickCancel(): void {
    this.router.navigateByUrl('dashboard');
  }

  addItem(): void {
    const item = new FormGroup({
      id: new FormControl(this.idProduct++, Validators.required),
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      state: new FormControl(''),
    });
    this.products.push(item);
  }

  saveData(state: TypeState, control: AbstractControl, index: number): void {
    switch (state) {
      case 'save':
        if (control.valid) {
          control.get('state')?.setValue('save');
          control.disable();
          const idFormProduct = control.get('id')?.value as number;
          this.productsFinal = this.productsFinal.filter(
            (x) => x.id !== idFormProduct
          );
          this.productsFinal.push(control.value);
        } else {
          console.log('debe llenar los cambios');
        }
        break;
      case 'edit':
        if (!control.invalid) {
          control.enable();
          control.get('state')?.setValue('edit');
          this.disabledButtonSave = false;
          this.disabledButtonEdit = true;
        } else {
          console.log('debe llenar los cambios');
        }

        break;
      case 'delete':
        const idFormProduct = control.get('id')?.value as number;
        this.productsFinal = this.productsFinal.filter(
          (x) => x.id !== idFormProduct
        );
        this.products.removeAt(index);
        break;
    }
  }

  guardarOrden(): void {
    if (this.orderForm.valid && this.productsFinal.length > 0) {
      const sendOrder: Order = new Order();
      sendOrder.id = this.orderForm.get('id')?.value;
      sendOrder.date = this.orderForm.get('date')?.value;
      sendOrder.clientName = this.orderForm.get('clientName')?.value;
      sendOrder.deleted = this.orderForm.get('deleted')?.value;
      sendOrder.products = this.productsFinal;
      if (this.isAddMode) {
        this.orderService.saveOrder(sendOrder).subscribe((data) => {
          this.channelOrder.getOrderCall(true);
        });
      } else {
        this.orderService
          .updateOrder(sendOrder.id, sendOrder)
          .subscribe((data) => {
            this.channelOrder.getOrderCall(true);
          });
      }
    } else {
      alert('Formulario inválido');
    }
  }
  get products() {
    return this.orderForm.get('products') as FormArray;
  }
}
