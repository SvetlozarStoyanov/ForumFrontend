import { SubforumOrder } from "../../enums/subforum-order";

export interface SubforumsQueryModel{
    page: number;
    order: SubforumOrder
}