import { PostListModel } from "../../../core/models/post-list-model";


export interface SubforumDetailsModel {
    id: number,
    name: string,
    posts: PostListModel[]
}