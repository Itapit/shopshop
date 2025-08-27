import { Role } from '@common/Enums';
import { CreateOrderRequest, GetOrdersListRequest } from '@common/Interfaces';
import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateOrderResponseDto, GetOrdersListResponseDTO, OrderDto } from './DTOs';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Client)
    @Post()
    async createOrder(@Body() dto: CreateOrderRequest, @Req() req: any): Promise<CreateOrderResponseDto> {
        const customer_id = req.user.userID;
        return this.ordersService.saveOrder(dto, customer_id);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get('total-profit')
    async getTotalProfit(): Promise<{ totalProfit: number }> {
        const totalProfit = await this.ordersService.totalProfit();
        return { totalProfit };
    }
    @UseGuards(AuthGuard)
    @Get('myorders')
    async getOrdersByUser(@Query() dto: GetOrdersListRequest, @Req() req: any): Promise<GetOrdersListResponseDTO> {
        const userId = req.user.userID;
        dto.customer_id = userId;
        return this.ordersService.getOrdersByUser(dto);
    }

    @Get(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async getOrderById(@Param('id') id: string): Promise<OrderDto> {
        return this.ordersService.getOrderById(id);
    }
}
