import { IRedeemHistoryItem } from "../historyRedeemItems/models";

export interface IUser {
    id: string;
    name: string;
    points: string;
    redeemHistory: IRedeemHistoryItem[];
    createDate: string;
}