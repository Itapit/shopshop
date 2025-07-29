import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "../products/repository/products.repository";
import { CreateOrderRequestDto } from "@common/DTOs/orders/create-order-request.dto";
import { CreateOrderResponseDto } from "@common/DTOs/orders/Create-order-response.dto";
import { OrdersRepository } from "./repository/orders.repository";
@Injectable()
export class OrdersService {
        constructor(
            private readonly ordersRepo: OrdersRepository,
            private readonly productRepo: ProductsRepository
        ) {} 


        async saveOrder(dto: CreateOrderRequestDto, customerId: string): Promise<CreateOrderResponseDto> {
        let totalPrice = 0;

        for (const item of dto.items) {
            const product = await this.productRepo.findById(item.product_id);

            if (!product) {
                throw new NotFoundException(`Product with ID ${item.product_id} not found`);
            }

            if (product.quantity < item.quantity) {
                throw new BadRequestException(`Not enough stock for product ${product.name}`);
            }

            
            totalPrice += product.price * item.quantity;
            await this.productRepo.updateById(product._id, {
            quantity: product.quantity - item.quantity,
            });
        }

        
        const createdOrder = await this.ordersRepo.createOrder({
            customer_id: customerId,
            items: dto.items,
            total_price: totalPrice,
        });

        return new CreateOrderResponseDto(createdOrder);
    } 

    async totalProfit(): Promise<number> {
        return this.ordersRepo.calculateTotalProfit();
    }






        

    
}