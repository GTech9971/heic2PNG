/**
 * 圧縮データ
 */
export interface CompressData {
    /** 圧縮を行う */
    isCompress: boolean;

    /** 圧縮ファイルサイズ(MB) */
    CompressLevel: number | null;
}