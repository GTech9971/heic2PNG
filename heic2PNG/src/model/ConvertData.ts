import { ConvertStatus } from "./ConvertStatus";

/**
 * 変換データ
 */
export interface ConvertData {
    /** ファイル */
    file: File;
    /** ジョブId */
    id: number;
    /** 変換ステータス */
    status: ConvertStatus;
    /** 変換率 */
    proccess: number;
    /** 変換済みデータ */
    convertedBlob: Blob | null;
}