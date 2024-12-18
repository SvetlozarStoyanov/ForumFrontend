import { UserMinInfoModel } from "../users/user-min-info-model";
import { UserPermittedActionsModel } from "../users/user-permitted-actions-model";
import { CommentReplyListModel } from "../../../core/models/comment-replies/comment-reply-list-model";
import { UserVoteModel } from "../users/user-vote-model";

export interface CommentListModel {
    id: number,
    text: string,
    createdOn: string,
    voteTally: number,
    user: UserMinInfoModel,
    userPermittedActions: UserPermittedActionsModel,
    userVote: UserVoteModel,
    replies: CommentReplyListModel[],
}