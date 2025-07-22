import { IsInt, IsOptional, Max, Min } from "class-validator";

export class GetProductsListDTO {
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    sortBy?: string;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(100)
    limit?: number = 10;
}