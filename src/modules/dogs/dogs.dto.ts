import { Category } from "../category/category.entity";

export class DogsDto {
    readonly title: string;
    readonly body: string;
    readonly category: Category;
}
