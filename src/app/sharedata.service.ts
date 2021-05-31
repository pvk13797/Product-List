import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const localUrl = '../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class SharedataService {

  setCount = new Subject<Number>();
  cartUpdatedSubj = new BehaviorSubject<any []>([]);

  public cartUpdated$ = this.cartUpdatedSubj.asObservable();

  constructor(private http: HttpClient) { }

  getProduct() {
    return this.http.get(localUrl);
  }

  public updateCart(item: any) {
    this.cartUpdatedSubj.next(item);
  }

}
