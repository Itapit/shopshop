import { Body, Controller, Post, UseGuards, Req, Get, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@common/Enums';
import { CreateOrderRequestDto, CreateOrderResponseDto, GetOrdersListRequestDto, GetOrdersListResponseDTO, OrderDto } from './DTOs';

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
  @UseGuards(AuthGuard)
  @Get('myorders')
  async getOrdersByUser(
    @Query() dto: GetOrdersListRequestDto,
    @Req() req: any 
  ): Promise<GetOrdersListResponseDTO> {

    
    
    const userId = req.user.sub; 
    dto.customerId = userId;

    return this.ordersService.getOrdersByUser(dto);
  }



  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin) 
  async getOrderById(@Param('id') id: string): Promise<OrderDto> {
    return this.ordersService.getOrderById(id);
  } 

}




