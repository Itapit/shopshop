import { CreateOrderRequest, GetOrdersListRequest } from '@common/Interfaces';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
    CreateOrderRequestDto,
    CreateOrderResponseDto,
    GetOrdersListRequestDto,
    GetOrdersListResponseDTO,
    OrderDto,
} from './DTOs';
import { mapOrderToDto } from './order.mapper';
import { IOrdersRepository, ORDERS_REPOSITORY } from './repository/orders-repository.interface';
import { IProductsRepository, PRODUCTS_REPOSITORY } from '../products/repository/products-repository.interface';
@Injectable()
export class OrdersService {

    constructor(
        @Inject(ORDERS_REPOSITORY) private readonly ordersRepo: IOrdersRepository,
        @Inject(PRODUCTS_REPOSITORY) private readonly productRepo: IProductsRepository
    ) {}

    async saveOrder(dto: CreateOrderRequest, customerId: string): Promise<CreateOrderResponseDto> {
        const checker = plainToInstance(CreateOrderRequestDto, dto);

        const errors = await validate(checker);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        let totalPrice = 0;

        for (const item of dto.items) {
            const product = await this.productRepo.findById(item.productID);

            if (!product) {
                throw new NotFoundException(`Product with ID ${item.productID} not found`);
            }

            if (product.quantity < item.quantity) {
                throw new BadRequestException(`Not enough stock for product ${product.name}`);
            }

            totalPrice += product.price * item.quantity;
            await this.productRepo.updateById(product.productID, {
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
        return mapOrderToDto(order);
    }

    async getOrdersByUser(dto: GetOrdersListRequest): Promise<GetOrdersListResponseDTO> {
        const checker = plainToInstance(GetOrdersListRequestDto, dto);
        const errors = await validate(checker);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }
        const { page = 1, limit = 10, sort_by } = dto;

        //const { orders, totalCount } = await this.ordersRepo.findByCustomerIdPaginated(dto.customer_id, page, limit , sortBy);
        const paginatedDto = await this.ordersRepo.findByCustomerIdPaginated(dto.customer_id, page, limit, sort_by);

        if (!paginatedDto.items || paginatedDto.items.length === 0) {
            throw new NotFoundException('No orders found for this customer');
        }

        const response = new GetOrdersListResponseDTO();
        response.orders = paginatedDto.items;
        response.page = page;
        response.limit = limit;
        response.totalCount = paginatedDto.totalCount;
        response.totalPages = Math.ceil(paginatedDto.totalCount / limit);

        return response;
    }
}
