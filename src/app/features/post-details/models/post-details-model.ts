import { SubforumMinInfoModel } from "../../../core/models/subforum-min-info-model";
import { UserMinInfoModel } from "../../../core/models/user-min-info-model";
import { CommentListModel } from "./comment-list-model";

export interface PostDetailsModel {
    id: number,
    title: string,
    text: string,
    voteTally: number,
    commentCount: number
    user: UserMinInfoModel,
    subforum: SubforumMinInfoModel,
    comments: CommentListModel[]
}