import { SubforumMinInfoModel } from "./subforum-min-info-model";
import { UserMinInfoModel } from "./user-min-info-model";
import { UserPermittedActionsModel } from "./user-permitted-actions-model";
import { UserVoteModel } from "./user-vote-model";



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