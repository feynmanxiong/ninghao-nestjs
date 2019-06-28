export interface ListOpitonInterface {
    categories: string;
    tags: string;
    limit: number;
    page: number;
    sort: string;
    order: 'ASC' | 'DESC';
}
