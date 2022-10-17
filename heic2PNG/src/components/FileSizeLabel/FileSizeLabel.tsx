import "./FileSizeLabel.scss";
import { ConvertData } from "../../model/ConvertData";

export interface FileSizeLabelProp {
    /**変換データ */
    data: ConvertData;
}

/**
 * 変換ファイルのサイズと変換後のファイルサイズを表示する
 * @param props 
 * @returns 
 */
export const FileSizeLabel = (props: FileSizeLabelProp) => {
    const { data } = props;
    const fileSizeMb: string = (data.file.size / 1024 / 1024).toFixed(2) + "MB";
    const convertFileSizeMb = (): string => {
        if (data?.convertedBlob === null) { return ""; }
        return " > " + (data?.convertedBlob?.size / 1024 / 1024).toFixed(2) + "MB";
    };

    return (
        <span>
            {fileSizeMb}
            {convertFileSizeMb()}
        </span>
    )
}