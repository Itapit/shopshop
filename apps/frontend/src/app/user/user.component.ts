import { Component } from "@angular/core";
import { Product } from "common/src/lib/Interfaces/product.interface";
import { SharedService } from "../shared/shared.service";

@Component({
  selector: "app-user",
  standalone: false,
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent {
    
    constructor(private sharedService: SharedService) {}
    totalPrice: number = 0;
    first: number = 0;
    rows: number = 4;
    productsCart: Product[]  = []; // נטו בשביל לעשות PAGANTION
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
    

    products: Product[]  = [  // צריכים להגיע מהפופאפ של היוזר ולהתווסף לפה
    {// כרגע זה רק דוגמא
      name: 'Bamba',
      price: 4.99,
      description: 'Classic peanut snack.',
      quantity: 30,
      imageUrl: 'assets/images/bamba.png'
    },
    {
      name: 'Chocolate Bar',
      price: 6.5,
      description: 'High-quality milk chocolate.',
      quantity: 12,
      imageUrl: 'https://images.weserv.nl/?url=images.snack/2.jpg'
    },
    {
      name: 'Coca-Cola Can',
      price: 3.5,
      description: 'Refreshing fizzy drink.',
      quantity: 24,
      imageUrl: 'https://images.weserv.nl/?url=images.snack/3.jpg'
    },
    {
      name: 'Potato Chips',
      price: 5.0,
      description: 'Crunchy salted chips.',
      quantity: 50,
      imageUrl: 'https://images.weserv.nl/?url=images.snack/4.jpg'
    },
    {
      name: 'Energy Drink',
      price: 8.0,
      description: 'Boost your energy anytime.',
      quantity: 18,
      imageUrl: 'https://images.weserv.nl/?url=images.snack/5.jpg'
    },
    {
      name: 'Orange Juice',
      price: 7.0,
      description: 'Freshly squeezed orange juice.',
      quantity: 10,
      imageUrl: 'https://images.weserv.nl/?url=images.snack/6.jpg'
    },
    {
      name: 'Chocolate Cookies',
      price: 9.99,
      description: 'Bite-sized chocolate chip cookies.',
      quantity: 40,
      imageUrl: 'assets/images/bamba.png'
    },
    {
      name: 'Mint Gum',
      price: 2.99,
      description: 'Long-lasting mint flavor.',
      quantity: 100,
      imageUrl: 'https://images.weserv.nl/?url=images.snack/8.jpg'
    },
    {
      name: 'Granola Bar',
      price: 3.5,
      description: 'Healthy and delicious snack.',
      quantity: 60,
      imageUrl: 'https://images.weserv.nl/?url=images.snack/9.jpg'
    },
    {
      name: 'Strawberry Yogurt',
      price: 4.0,
      description: 'Creamy strawberry flavored yogurt.',
      quantity: 20,
      imageUrl: 'https://images.weserv.nl/?url=images.snack/10.jpg'
    }
  ]; 


  
 
    



}