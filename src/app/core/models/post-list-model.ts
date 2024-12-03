import { SubforumMinInfoModel } from "./subforum-min-info-model";
import { UserMinInfoModel } from "./user-min-info-model";
import { UserVoteModel } from "./user-vote-model";



export interface PostListModel {
    id: number,
    title: string,
    text: string,
    voteTally: number,
    commentCount: number,
    user: UserMinInfoModel,
    subforum: SubforumMinInfoModel,
    userVote: UserVoteModel
}