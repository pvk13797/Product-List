import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import data from '../../assets/data.json';
import * as $ from 'jquery';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  toggled: boolean = false;
  products: Array<any> = data;
  searchText: any;
  
  constructor() { }

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
  }

}
