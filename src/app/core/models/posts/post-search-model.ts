import { SubforumMinInfoModel } from "../subforums/subforum-min-info-model";

export interface PostSearchModel{
    id: number,
    title: string,
    subforum: SubforumMinInfoModel
}