import "./ConvertButton.css";
import { IonButton } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { ConvertStatus } from "../../model/ConvertStatus";
import { convertStatusContext, setConvertStatusContext } from "../providers/ConvertStatusProvider";

export interface ConvertButtonProps {
}

const DOWNLOAD_TEXT: string = "Download";
const CONVERT_TEXT: string = "Convert";

export const ConvertButton = (props: ConvertButtonProps) => {
    const [text, setText] = useState<string>(CONVERT_TEXT);
    const [disable, setDisable] = useState<boolean>(false);

    const status: ConvertStatus = useContext<ConvertStatus>(convertStatusContext);
    const setStatus = useContext(setConvertStatusContext);

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
    }, [status]);

    /** ボタンクリックイベント */
    const onClickConvertBtn = async () => {
        if (status === ConvertStatus.NONE) {
            setStatus(ConvertStatus.PROCESSING);
        }
    };

    return (
        <IonButton size="large" color={color} onClick={onClickConvertBtn} disabled={disable}>
            {text}
        </IonButton>
    )
};