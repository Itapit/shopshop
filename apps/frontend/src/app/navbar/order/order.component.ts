import { Component, EventEmitter, Output } from "@angular/core";
import { SharedService } from "../../shared/shared.service";

@Component({
  selector: "app-order-link",    
  standalone: false,
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent {
  
  constructor(private sharedService: SharedService) {}
    
  clickOrder() {
    this.sharedService.triggerOrder();
    
  }

}