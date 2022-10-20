import "./FileCardDownloadButton.scss";
import { IonButton, IonIcon } from "@ionic/react";
import { useEffect, useState } from "react";
import { arrowDownCircleOutline } from "ionicons/icons";
import { ConvertStatus } from "../../model/ConvertStatus";

export interface FileCardDownloadButtonProps {
    /** ダウンロードイベント */
    onClickDownload: () => void;
    /** 変換ステータス */
    status: ConvertStatus;
}

export const FileCardDownloadButton = (props: FileCardDownloadButtonProps) => {
    const [disable, setDisable] = useState<boolean>(true);
    // ダウンロードしたかどうか
    const [isDownload, setIsDownload] = useState<boolean>(false);
    const { onClickDownload, status } = props;

    useEffect(() => {
        //処理が完了したらダウンロード可能にする
        if (status === ConvertStatus.DONE) {
            setDisable(false);
        }
    }, [status]);

    const onClick = () => {
        onClickDownload();
        setIsDownload(true);
    };

    return (
        <IonButton color={'success'} onClick={onClick} disabled={disable} >
            Download
            <>{isDownload && <IonIcon icon={arrowDownCircleOutline} />}</>
        </IonButton>
    )
};