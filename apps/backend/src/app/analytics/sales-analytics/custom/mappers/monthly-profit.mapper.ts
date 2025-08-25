import { MonthlyProfit } from "@common/Interfaces";
import { MonthlyProfitDto } from "../DTOs/base/monthly-profit.dto";

export function mapMonthlyProfit(rows: MonthlyProfit[]): MonthlyProfitDto[] {
  return rows.map(
    (row) =>
      new MonthlyProfitDto(
         row.month,
         row.productId,
         row.profit,
      )
  );
}