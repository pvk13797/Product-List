import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedataService } from '../sharedata.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  toggled: boolean = false;
  products: any = [];
  searchText: any;
  cart: any = [];
  

  constructor(private sharedData: SharedataService) { }

  addItemToCart(item:any) {
    this.cart.push(item);
    this.sharedData.updateCart(this.cart);
  }

  removeItemFromCart(item: any) {
    const idx = this.cart.findIndex((o: { itemId: any; }) => 
      this.cart.find((x: { itemId: any; }) => o.itemId === x.itemId));

      if (idx > -1) {
        this.cart.removeAt(idx);
        this.sharedData.updateCart(this.cart);
      }
  }

  onAdd() {
    this.sharedData.setCount.next(1);
  }

  onDelete() {
    this.sharedData.setCount.next(-1);
  }

  /* showMe() {
    this.toggled = !this.toggled;
    console.log(this.toggled);
  } */

  ngOnInit(): void {
   $(document).ready(function() {
      $(".bi-search").click(function() {
          $(".icon").toggleClass("active");
          $("input[type='text']").toggleClass("active");
      });
  });

  this.sharedData.getProduct().subscribe(data => {
    for (const d of (data as any)) {
      this.products.push({
        name: d.name,
        price: d.price,
        images: d.images
      });
    }
    console.log(this.products);
  });
  }

}
