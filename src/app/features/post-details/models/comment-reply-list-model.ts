import { UserMinInfoModel } from "../../../core/models/user-min-info-model";

export interface CommentReplyListModel{
    id: number,
    text: string,
    user: UserMinInfoModel,
    voteTally: number
}