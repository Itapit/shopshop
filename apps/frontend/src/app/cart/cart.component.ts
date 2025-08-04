import { Component } from "@angular/core";
import { SharedService } from "../shared/shared.service";
import { ProductBase, ProductFull } from "@common/Interfaces";
import { productListOptionsEnum } from "../products/product-list/product-list-options-enum";
import { Observable, of } from "rxjs";
import { CartService } from "./services/cart.service";

@Component({
  selector: "app-cart",
  standalone: false,
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent {
    products: ProductFull[]  = []
    productListOptionsEnum = productListOptionsEnum;
    
    
    constructor(private sharedService: SharedService , private cartService: CartService) {}
    totalPrice: number = 0;
    totalRecords: number = 0;

    ngOnInit() {
      this.sharedService.orderClicked$.subscribe(() => {
        this.handleOrder();
      }); 

       this.cartService.getCart().subscribe({
            next: (res) => {
            console.log("success", res.items); 
            this.products = res.items;
            this.totalRecords= this.products.length
            },
            error: (err) => {
            console.error("failed", err);
            }
        }); 

      
    }
    
    handleOrder() {
      console.log("Order has been placed!");
    }
    

     
     
    

  
    fetchProducts = (page: number, limit: number): Observable<ProductFull[]> => {
      const start = (page - 1) * limit;
      const end = start + limit;
      const sliced = this.products.slice(start, end);
      console.log(this.products);
      return of(sliced);
    }; 

    

} 



  //   products: ProductFull[]  = [  // צריכים להגיע מהפופאפ של היוזר ולהתווסף לפה
  //   {// כרגע זה רק דוגמא
  //     productID:"2",
  //     name: 'Bamba',
  //     price: 4.99,
  //     description: 'Classic peanut snack.',
  //     quantity: 30,
  //     imageUrl: 'assets/images/bamba.png'
  //   },
  //   {
  //     productID:"2",
  //     name: 'Chocolate Bar',
  //     price: 6.5,
  //     description: 'High-quality milk chocolate.',
  //     quantity: 12,
  //     imageUrl: 'https://images.weserv.nl/?url=images.snack/2.jpg'
  //   },
  //   {
  //     productID:"a",
  //     name: 'Coca-Cola Can',
  //     price: 3.5,
  //     description: 'Refreshing fizzy drink.',
  //     quantity: 24,
  //     imageUrl: 'https://images.weserv.nl/?url=images.snack/3.jpg'
  //   },
  //   {
  //     productID:"1",
  //     name: 'Potato Chips',
  //     price: 5.0,
  //     description: 'Crunchy salted chips.',
  //     quantity: 50,
  //     imageUrl: 'https://images.weserv.nl/?url=images.snack/4.jpg'
  //   },
  //   {
  //     productID:"d0",
  //     name: 'Energy Drink',
  //     price: 8.0,
  //     description: 'Boost your energy anytime.',
  //     quantity: 18,
  //     imageUrl: 'https://images.weserv.nl/?url=images.snack/5.jpg'
  //   },
  // ]; 