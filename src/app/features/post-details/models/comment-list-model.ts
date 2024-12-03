import { UserMinInfoModel } from "../../../core/models/user-min-info-model";
import { UserVoteModel } from "../../../core/models/user-vote-model";
import { CommentReplyListModel } from "./comment-reply-list-model";

export interface CommentListModel {
    id: number,
    text: string,
    voteTally: number
    user: UserMinInfoModel,
    userVote: UserVoteModel,
    replies: CommentReplyListModel[],
}