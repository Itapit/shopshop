import { MonthlyQuantity } from '@common/Interfaces';
import { MonthlyQuantityDto } from '../DTOs/base/monthly-quantity.dto';

export function mapMonthlyQuantity(rows: MonthlyQuantity[]): MonthlyQuantityDto[] {
    return rows.map((row) => new MonthlyQuantityDto(row.month, row.productId, row.quantity));
}
