import "./FileCardDownloadButton.scss";
import { IonButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { ConvertStatus } from "../../model/ConvertStatus";

export interface FileCardDownloadButtonProps {
    /** ダウンロードイベント */
    onClickDownload: () => void;
    /** 変換ステータス */
    status: ConvertStatus;
}

export const FileCardDownloadButton = (props: FileCardDownloadButtonProps) => {
    const [disable, setDisable] = useState<boolean>(true);
    const { onClickDownload, status } = props;

    useEffect(() => {
        //処理が完了したらダウンロード可能にする
        if (status === ConvertStatus.DONE) {
            setDisable(false);
        }
    }, [status]);

    return (
        <IonButton color={'success'} onClick={onClickDownload} disabled={disable}>
            Download
        </IonButton>
    )
};