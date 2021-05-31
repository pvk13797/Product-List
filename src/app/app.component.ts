import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'product-list';

  year = new Date().getFullYear();

  /* productList = [
    {name: 'Z900', price: 8799},
    {name: 'shubert helmet', price: 999},
    {name: 'sport gloves', price: 99}
   ];

  cartProductList: any[] = [];
 
  addProductToCart(product: any) {
    const productExistInCart = this.cartProductList.find(({name}) => name === product.name); // find product by name
    if (!productExistInCart) {
      this.cartProductList.push({...product, num:1}); // enhance "porduct" opject with "num" property
      return;
    }
    productExistInCart.num += 1;
  }
   removeProduct(product: any) {
    this.cartProductList = this.cartProductList.filter(({name}) => name !== product.name)
   } */
}
