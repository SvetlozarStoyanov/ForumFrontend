import { UserMinInfoModel } from "../users/user-min-info-model";
import { UserPermittedActionsModel } from "../users/user-permitted-actions-model";
import { UserVoteModel } from "../users/user-vote-model";

export interface CommentReplyListModel {
    id: number,
    text: string,
    createdOn: string,
    voteTally: number,
    user: UserMinInfoModel,
    userPermittedActions: UserPermittedActionsModel,
    userVote: UserVoteModel
}