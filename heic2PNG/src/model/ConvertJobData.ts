import { ConvertStatus } from "./ConvertStatus";

/**
 * 変換ジョブ管理データ
 */
export interface ConvertJobData {
    FinishedJobCount: number;
    /** 全ジョブ数 */
    TotalJobCount: number;
    /** 全体の変換ステータス */
    WholeStatus: ConvertStatus;
}