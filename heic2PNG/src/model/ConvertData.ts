import { ConvertStatus } from "./ConvertStatus";

/**
 * 変換データ
 */
export interface ConvertData {
    /** ファイル */
    file: File;
    /** 変換ステータス */
    status: ConvertStatus;
    /** 変換率 */
    proccess: number;
}