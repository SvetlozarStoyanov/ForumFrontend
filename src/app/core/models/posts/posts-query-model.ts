import { PostOrder } from "../../enums/post-order";

export interface PostsQueryModel {
    page: number,
    order: PostOrder
}