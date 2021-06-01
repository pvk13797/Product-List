import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedataService } from '../sharedata.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})

export class TicketViewComponent implements OnInit {

  // @ViewChild('content', {static: false}) content!: ElementRef;

  public isCollapsed = false;
  itemCount: number = 0;
  taxPrice: number = 12.40;
  addCart: any = [];
  cart: {[key:string]: any[]} = {};
  cartItems: Array<string> = [];

  constructor(private sharedData: SharedataService) { }

  public openPDF():void {
    //let DATA: any = document.getElementById('content')?.innerHTML;
    let PDF: jsPDF = new jsPDF();

    PDF.setFontSize(18);
    PDF.text('Invoice Bill', 95, 8);
    PDF.setFontSize(11);
    PDF.setTextColor(100);

    (PDF as any).autoTable({
      html: ("#content"),
      theme: 'striped'
    })
    PDF.output("dataurlnewwindow");
    PDF.save('Product-List-Bill.pdf');

  /*PDF.html(DATA, {
      callback: (PDF) => {
        PDF.output("dataurlnewwindow");
      }
    }); */ 
      //PDF.save('product-list.pdf'); 
  }

  getPrice(name: any) {
    let totalPrice = 0;
    // return this.cart[name].reduce((a, b) => a.price + b.price, 0);
    this.cart[name].forEach((o) => {
      totalPrice = totalPrice + o.price;
    });
    return totalPrice;
  }

  getTotalPrice() {
    let totalPrice = 0;

    this.cartItems.forEach((o) => {
      totalPrice = totalPrice + this.getPrice(o);
    });
      totalPrice = totalPrice + this.taxPrice;
    return totalPrice;
  }

/*   getTotal(name: any) {
    let totalAmount = 0;
    let totalPrice = this.cartItems[name].includes(name.price);
    return totalPrice;
  }  */

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
