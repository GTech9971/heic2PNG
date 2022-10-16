import "./ConvertButton.css";
import { IonButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { ConvertStatus } from "../../model/ConvertStatus";

export interface ConvertButtonProps {
    /** ダウンロードイベント */
    onClickDownload: () => void;
    /** 変換イベント */
    onClickConvert: () => void;
    /** 変換モデルのステータス */
    status: ConvertStatus;
}

const DOWNLOAD_TEXT: string = "Download";
const CONVERT_TEXT: string = "Convert";

export const ConvertButton = (props: ConvertButtonProps) => {
    const [text, setText] = useState<string>(CONVERT_TEXT);
    const [disable, setDisable] = useState<boolean>(false);
    const { onClickDownload, onClickConvert, status } = props;
    const color: string = text === CONVERT_TEXT ? 'danger' : 'success';

    useEffect(() => {
        // 処理中はボタン操作不可
        if (status === ConvertStatus.PROCESSING) {
            setText(CONVERT_TEXT);
            setDisable(true);
        }

        //処理が完了したらダウンロード可能にする
        if (status === ConvertStatus.DONE) {
            setText(DOWNLOAD_TEXT);
            setDisable(false);
        }
    })

    /** ボタンクリックイベント */
    const onClickConvertBtn = async () => {
        if (text === DOWNLOAD_TEXT) {
            onClickDownload();
        }

        if (text === CONVERT_TEXT) {
            onClickConvert();
        }
    };

    return (
        <IonButton color={color} onClick={onClickConvertBtn} disabled={disable}>
            {text}
        </IonButton>
    )
};