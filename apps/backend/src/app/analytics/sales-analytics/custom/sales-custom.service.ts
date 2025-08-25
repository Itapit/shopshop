import { TopProductsRequest } from '@common/Interfaces';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { IProductsRepository, PRODUCTS_REPOSITORY } from '../../../products/repository/products-repository.interface';
import { TopProductsRequestDto } from './DTOs/request/top-products-request.dto';
import { TopProductsProfitResponseDto } from './DTOs/response/top-products-profit-response.dto';
import { TopProductsQuantityResponseDto } from './DTOs/response/top-products-quantity-response.dto';
import {
    ISalesCustomAnalyticsRepository,
    SALES_CUSTOM_ANALYTICS_REPOSITORY,
} from './repository/sales-custom-repository.interface';

@Injectable()
export class SalesCustomService {
    
    private readonly defaultTz = 'Asia/Jerusalem';
    private response: TopProductsQuantityResponseDto | TopProductsProfitResponseDto;

    constructor(
        @Inject(SALES_CUSTOM_ANALYTICS_REPOSITORY)
        private readonly salesAnalyticsRepository: ISalesCustomAnalyticsRepository,
        @Inject(PRODUCTS_REPOSITORY) private readonly productRepo: IProductsRepository
    ) {}
    

    async fetchMonthlyProduct(
        dto: TopProductsRequest
    ): Promise<TopProductsQuantityResponseDto | TopProductsProfitResponseDto> {
        const checker = plainToInstance(TopProductsRequestDto, dto);
        const errors = await validate(checker);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        const fromYYYYMM = checker.from;
        const toYYYYMM = checker.to;
        const timezone = checker.timezone ?? this.defaultTz;
        const k = checker.k ?? 5;

        const months = this.buildMonthList(fromYYYYMM, toYYYYMM);
        if (months.length === 0) {
            return { months: [], rows: [], totalsPerMonth: [] };
        }

        const startUtc = this.monthStartUtc(months[0]);
        const endUtc = this.monthStartUtc(this.addOneMonth(months.at(-1)!));

        switch (checker.metric) {
            case 'quantity': return this.fetchMonthlyProductQuantity(startUtc, endUtc, months, timezone, k);
            case 'profit': return this.fetchMonthlyProductProfit(startUtc, endUtc, months, timezone, k);

            default:
                throw new BadRequestException('Invalid metric. Must be "quantity" or "profit".');
    }
} 

    async fetchMonthlyProductQuantity(
        startUtc: Date,
        endUtc: Date,
        months: string[],
        timezone: string,
        k = 5
    ): Promise<TopProductsQuantityResponseDto> {
        const rows = await this.salesAnalyticsRepository.fetchMonthlyProductQuantity(
                startUtc,
                endUtc,
                months,
                timezone,
                k
            ); 
        
        const totalsPerMonth = months.map((m) =>
                rows.filter((r) => r.month === m).reduce((sum, r) => sum + r.quantity, 0)
            ); 
        
        this.response = new TopProductsQuantityResponseDto();
            this.response.months = months;

            const productNames = await Promise.all(
                rows.map((row) =>
                    this.productRepo.findById(row.productId).then((p) => (p ? p.name : 'Unknown Product'))
                )
            );
            this.response.rows = rows.map((row, idx) => ({
                month: row.month,
                productId: row.productId,
                quantity: row.quantity,
                productName: productNames[idx],
            }));
            this.response.totalsPerMonth = totalsPerMonth; 
        return this.response as TopProductsQuantityResponseDto;

    } 


    async fetchMonthlyProductProfit(
        startUtc: Date,
        endUtc: Date,
        months: string[],
        timezone: string,
        k = 5
    ): Promise<TopProductsProfitResponseDto> {
        const rows = await this.salesAnalyticsRepository.fetchMonthlyProductProfit(
                startUtc,
                endUtc,
                months,
                timezone,
                k
            ); 
        
        const totalsPerMonth = months.map((m) =>
                rows.filter((r) => r.month === m).reduce((sum, r) => sum + r.profit, 0)
            ); 
        
        this.response = new TopProductsProfitResponseDto();
            this.response.months = months;

            const productNames = await Promise.all(
                rows.map((row) =>
                    this.productRepo.findById(row.productId).then((p) => (p ? p.name : 'Unknown Product'))
                )
            );
            this.response.rows = rows.map((row, idx) => ({
                month: row.month,
                productId: row.productId,
                profit: row.profit,
                productName: productNames[idx],
            }));
            this.response.totalsPerMonth = totalsPerMonth; 
        return this.response as TopProductsProfitResponseDto;

    }

    private buildMonthList(from: string, to: string): string[] {
        const [fy, fm] = from.split('-').map(Number);
        const [ty, tm] = to.split('-').map(Number);
        const out: string[] = [];
        let y = fy,
            m = fm;
        while (y < ty || (y === ty && m <= tm)) {
            out.push(`${y}-${String(m).padStart(2, '0')}`);
            m++;
            if (m === 13) {
                m = 1;
                y++;
            }
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
