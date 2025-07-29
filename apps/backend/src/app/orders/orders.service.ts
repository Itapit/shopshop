import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "../products/repository/products.repository";
import { CreateOrderRequestDto } from "@common/DTOs/orders/create-order-request.dto";
import { CreateOrderResponseDto } from "@common/DTOs/orders/Create-order-response.dto";
import { OrdersRepository } from "./repository/orders.repository";
import { OrderDto } from "@common/DTOs/orders/order.dto";
import { GetOrdersListRequestDto } from "@common/DTOs/orders/get-orders-list-request.dto";
import { GetOrdersListResponseDTO } from "@common/DTOs/orders/get-orders-list-response.dto";
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


    async getOrderById(id: string): Promise<OrderDto> {
        const order = await this.ordersRepo.findById(id);
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    } 

    async getOrdersByUser(dto: GetOrdersListRequestDto): Promise<GetOrdersListResponseDTO> {
        const { page = 1, limit = 10, sortBy } = dto;
        const { orders, totalCount } = await this.ordersRepo.findByCustomerIdPaginated(dto.customer_id, page, limit , sortBy);

        if (!orders || orders.length === 0) {
            throw new NotFoundException('No orders found for this customer');
        }

        const response = new GetOrdersListResponseDTO();
        response.data = orders;
        response.page = page;
        response.limit = limit;
        response.totalCount = totalCount;
        response.totalPages = Math.ceil(totalCount / limit);

        return response;
    }






        

    
}