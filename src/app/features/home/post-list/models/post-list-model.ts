import { SubforumMinInfoModel } from "../../../../core/models/subforum-min-info-model";
import { UserMinInfoModel } from "../../../../core/models/user-min-info-model";


export interface PostListModel {
    id: number,
    title: string,
    text: string,
    voteTally: number,
    user: UserMinInfoModel,
    subforum: SubforumMinInfoModel,
    commentCount: number
}