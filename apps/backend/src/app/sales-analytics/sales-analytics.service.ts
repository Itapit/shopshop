import { BadRequestException, Injectable } from '@nestjs/common';
import { SalesAnalyticsRepository } from './repository/sales-analytics.repository';
import { TopProductsQuantityRequest } from '@common/Interfaces';
import { plainToInstance } from 'class-transformer';
import { TopProductsQuantityRequestDto } from './DTOs/request/top-products-request.dto';
import { validate } from 'class-validator';
import { TopProductsQuantityResponseDto } from './DTOs/response/top-products-response.dto';

@Injectable()
export class SalesAnalyticsService {
  private readonly defaultTz = 'Asia/Jerusalem';

  constructor(private readonly salesAnalyticsRepository: SalesAnalyticsRepository) {}

  async fetchMonthlyProductQuantity(
    dto: TopProductsQuantityRequest
  ): Promise<TopProductsQuantityResponseDto> {
    
    const checker = plainToInstance(TopProductsQuantityRequestDto, dto);
    const errors = await validate(checker);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    
    const fromYYYYMM = checker.from;
    const toYYYYMM   = checker.to;
    const timezone   = this.defaultTz;

    
    const months = this.buildMonthList(fromYYYYMM, toYYYYMM);
    if (months.length === 0) {
      return { months: [], rows: [], totalsPerMonth: [] };
    }

   
    const startUtc = this.monthStartUtc(months[0]);
    const endUtc   = this.monthStartUtc(this.addOneMonth(months.at(-1)!));

    
    const rows = await this.salesAnalyticsRepository.fetchMonthlyProductQuantity(
      startUtc,
      endUtc,
      months,
      timezone,
    );

    
    const totalsPerMonth = months.map(
      m => rows.filter(r => r.month === m).reduce((sum, r) => sum + r.quantity, 0)
    ); 

    const response = new TopProductsQuantityResponseDto();
    response.months = months;
    response.rows = rows.map(row => ({
      month: row.month,
      productId: row.productId,
      quantity: row.quantity,
    }));
    response.totalsPerMonth = totalsPerMonth;

    
    return response;
  }

  
  private buildMonthList(from: string, to: string): string[] {
    const [fy, fm] = from.split('-').map(Number);
    const [ty, tm] = to.split('-').map(Number);
    const out: string[] = [];
    let y = fy, m = fm;
    while (y < ty || (y === ty && m <= tm)) {
      out.push(`${y}-${String(m).padStart(2, '0')}`);
      m++;
      if (m === 13) { m = 1; y++; }
    }
    return out;
  }

  private addOneMonth(yyyyMM: string): string {
    const [y, m] = yyyyMM.split('-').map(Number);
    const ny = m === 12 ? y + 1 : y;
    const nm = m === 12 ? 1 : m + 1;
    return `${ny}-${String(nm).padStart(2, '0')}`;
  }

  private monthStartUtc(yyyyMM: string): Date {
    const [y, m] = yyyyMM.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, 1, 0, 0, 0));
  }
}