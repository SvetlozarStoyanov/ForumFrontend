import { PostListModel } from "../../home/post-list/models/post-list-model";

export interface SubforumDetailsModel {
    id: number,
    name: string,
    posts: PostListModel[]
}