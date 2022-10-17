import "./ConvertButton.css";
import { IonButton } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { ConvertStatus } from "../../model/ConvertStatus";
import { convertStatusContext, setConvertStatusContext } from "../providers/ConvertStatusProvider";

export const ConvertButton = () => {
    const [disable, setDisable] = useState<boolean>(false);
    const status: ConvertStatus = useContext<ConvertStatus>(convertStatusContext);
    const setStatus = useContext(setConvertStatusContext);

    useEffect(() => {
        // 処理中はボタン操作不可
        if (status === ConvertStatus.PROCESSING) {
            setDisable(true);
        }
    }, [status]);

    /** ボタンクリックイベント */
    const onClickConvertBtn = async () => {
        if (status === ConvertStatus.NONE) {
            setStatus(ConvertStatus.PROCESSING);
        }
    };

    return (
        <IonButton size="large" color={'danger'} onClick={onClickConvertBtn} disabled={disable}>
            Convert
        </IonButton>
    )
};