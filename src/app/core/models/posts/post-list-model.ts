import { SubforumMinInfoModel } from "../subforums/subforum-min-info-model";
import { UserMinInfoModel } from "../users/user-min-info-model";
import { UserPermittedActionsModel } from "../users/user-permitted-actions-model";
import { UserVoteModel } from "../users/user-vote-model";

export interface PostListModel {
    id: number,
    title: string,
    text: string,
    voteTally: number,
    commentCount: number,
    user: UserMinInfoModel,
    subforum: SubforumMinInfoModel,
    userPermittedActions: UserPermittedActionsModel,
    userVote: UserVoteModel
}