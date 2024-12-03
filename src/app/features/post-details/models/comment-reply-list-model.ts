import { UserMinInfoModel } from "../../../core/models/user-min-info-model";
import { UserVoteModel } from "../../../core/models/user-vote-model";

export interface CommentReplyListModel{
    id: number,
    text: string,
    voteTally: number,
    user: UserMinInfoModel,
    userVote: UserVoteModel
}