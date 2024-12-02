import { PostListModel } from "../../../core/models/post-list-model";
import { SubforumMinInfoModel } from "../../../core/models/subforum-min-info-model";
import { UserMinInfoModel } from "../../../core/models/user-min-info-model";
import { CommentListModel } from "./comment-list-model";

export interface PostDetailsModel {
    post: PostListModel,
    user: UserMinInfoModel,
    subforum: SubforumMinInfoModel,
    comments: CommentListModel[]
}