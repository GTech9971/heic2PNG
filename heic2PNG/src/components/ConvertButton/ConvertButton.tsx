import "./ConvertButton.css";
import { IonButton } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { ConvertStatus } from "../../model/ConvertStatus";
import { convertStatusContext, setConvertStatusContext } from "../providers/ConvertStatusProvider";

export const ConvertButton = () => {
    const [text, setText] = useState<string>("CONVERT");
    const [disable, setDisable] = useState<boolean>(false);
    const status: ConvertStatus = useContext<ConvertStatus>(convertStatusContext);
    const setStatus = useContext(setConvertStatusContext);

    useEffect(() => {
        // 処理中はボタン操作不可
        if (status === ConvertStatus.PROCESSING) {
            setText("CONVERTING");
            setDisable(true);
        }

        //変換完了後はテキストを変更する
        if (status === ConvertStatus.DONE) {
        }

    }, [status]);

    /** ボタンクリックイベント */
    const onClickConvertBtn = async () => {
        if (status === ConvertStatus.NONE) {
            setStatus(ConvertStatus.PROCESSING);
        }
    };

    return (
        <section className="convert-btn-box">
            <IonButton className="convert-btn" expand="block" color={'danger'} onClick={onClickConvertBtn} disabled={disable}>
                {text}
            </IonButton>
        </section>
    )
};