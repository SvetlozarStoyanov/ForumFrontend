import { SubforumMinInfoModel } from "./subforum-min-info-model";
import { UserMinInfoModel } from "./user-min-info-model";



export interface PostListModel {
    id: number,
    title: string,
    text: string,
    voteTally: number,
    user: UserMinInfoModel,
    subforum: SubforumMinInfoModel,
    commentCount: number
}