import { Component } from "@angular/core";
import { SharedService } from "../shared/shared.service";
import { ProductBase, ProductFull } from "@common/Interfaces";
import { productListOptionsEnum } from "../products/product-list/product-list-options-enum";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-user",
  standalone: false,
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent {
  
  productListOptionsEnum = productListOptionsEnum;
    
    constructor(private sharedService: SharedService) {}
    totalPrice: number = 0;
    first: number = 0;
    rows: number = 4;
    productsCart: ProductBase[]  = []; // נטו בשביל לעשות PAGANTION
    onPageChange(event: any, rows?: number) {
        this.first = event.first;
        this.rows = event.rows;
        this.productsCart = this.products.slice(this.first, this.first + this.rows);
        
    } 

    ngOnInit() {
      this.sharedService.orderClicked$.subscribe(() => {
       
        this.handleOrder();
      });
    }
  handleOrder() {
    console.log("Order has been placed!");
  }
    

    products: ProductFull[]  = [  // צריכים להגיע מהפופאפ של היוזר ולהתווסף לפה
    {// כרגע זה רק דוגמא
      _id:"2",
      name: 'Bamba',
      price: 4.99,
      description: 'Classic peanut snack.',
      quantity: 30,
      imageUrl: 'assets/images/bamba.png'
    },
    {
      _id:"2",
      name: 'Chocolate Bar',
      price: 6.5,
      description: 'High-quality milk chocolate.',
      quantity: 12,
      imageUrl: 'https://images.weserv.nl/?url=images.snack/2.jpg'
    },
    {
      _id:"a",
      name: 'Coca-Cola Can',
      price: 3.5,
      description: 'Refreshing fizzy drink.',
      quantity: 24,
      imageUrl: 'https://images.weserv.nl/?url=images.snack/3.jpg'
    },
    {
      _id:"1",
      name: 'Potato Chips',
      price: 5.0,
      description: 'Crunchy salted chips.',
      quantity: 50,
      imageUrl: 'https://images.weserv.nl/?url=images.snack/4.jpg'
    },
    {
      _id:"d0",
      name: 'Energy Drink',
      price: 8.0,
      description: 'Boost your energy anytime.',
      quantity: 18,
      imageUrl: 'https://images.weserv.nl/?url=images.snack/5.jpg'
    },
  ]; 
  totalRecords= this.products.length

  
  fetchProducts = (page: number, limit: number): Observable<ProductFull[]> => {
    const start = (page - 1) * limit;
    const end = start + limit;
    const sliced = this.products.slice(start, end);

    return of(sliced);
  };

}