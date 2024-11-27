import { UserMinInfoModel } from "../../../core/models/user-min-info-model";
import { CommentReplyListModel } from "./comment-reply-list-model";

export interface CommentListModel {
    id: number,
    text: string,
    voteTally: number
    user: UserMinInfoModel,
    replies: CommentReplyListModel[],
}