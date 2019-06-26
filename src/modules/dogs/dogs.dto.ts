import { Category } from "../category/category.entity";
import { Tag } from "../tag/tag.entity";

export class DogsDto {
    readonly title: string;
    readonly body: string;
    readonly category: Category;
    tags: Tag[];
}
