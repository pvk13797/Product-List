import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedataService } from '../sharedata.service';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {

  public isCollapsed = false;
  itemCount: number = 0;
  addCart: any = [];
  cart: {[key:string]: any[]} = {};
  cartItems: Array<string> = [];

  constructor(private sharedData: SharedataService) { }

  getPrice(name: any) {
    let totalPrice = 0;
    // return this.cart[name].reduce((a, b) => a.price + b.price, 0);
    this.cart[name].forEach((o) => {
      totalPrice = totalPrice + o.price;
    });
    return totalPrice;
  }

  getTotal(total: any) {
    let totalAmount = 0;
    this.cartItems[total]
      totalAmount = totalAmount + total;
    return totalAmount;
  }

  ngOnInit(): void {

/*     this.sharedData.setCount.subscribe((msg: any) => {
      this.itemCount = (this.itemCount + (msg)) < 1 ? 0 : this.itemCount + (msg);
    });

    this.sharedData.getProduct().subscribe((data: any) => {
      this.addCart = (this.addCart + (data)) < 1 ? 0 : this.addCart + (data);
    }); */

    this.sharedData.cartUpdated$.subscribe((updatedCart) => {
      if(updatedCart) {
        this.cart = {};
        // this.cart = updatedCart;
        updatedCart.forEach((o) => {
          if(Object.keys(this.cart).includes(o.name)) {
            this.cart[o.name].push(o);
          } else {
            this.cart[o.name] = [o];
          }
        });
        this.cartItems = Object.keys(this.cart);
        console.log(this.cartItems);
      }
    });

  }

}
