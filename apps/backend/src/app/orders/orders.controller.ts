import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequestDto } from '@common/DTOs/orders/create-order-request.dto';
import { CreateOrderResponseDto } from '@common/DTOs/orders/Create-order-response.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Request } from 'express';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@common/Enums';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Client)
  @Post()
  async createOrder(
    @Body() dto: CreateOrderRequestDto,
    @Req() req: any
  ): Promise<CreateOrderResponseDto> {
    const customerId = req.user.sub; 
    return this.ordersService.saveOrder(dto, customerId);
  } 



  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('total-profit')
  async getTotalProfit(): Promise<{ totalProfit: number }> {
    const totalProfit = await this.ordersService.totalProfit();
    return { totalProfit };
  }
}

