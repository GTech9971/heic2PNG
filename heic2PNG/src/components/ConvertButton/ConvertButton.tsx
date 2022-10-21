import "./ConvertButton.css";
import { IonButton } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { ConvertStatus } from "../../model/ConvertStatus";
import { convertStatusContext, setConvertStatusContext } from "../providers/ConvertStatusProvider";
import { ConvertJobData } from "../../model/ConvertJobData";
import { convertJobContext } from "../providers/ConvertJobStatusProvider";

export const ConvertButton = () => {
    // ジョブ管理
    const convertJob: ConvertJobData = useContext<ConvertJobData>(convertJobContext);

    const [text, setText] = useState<"CONVERT" | "PROCESSING" | "DONE">("CONVERT");
    const [disable, setDisable] = useState<boolean>(false);
    const status: ConvertStatus = useContext<ConvertStatus>(convertStatusContext);
    const setStatus = useContext(setConvertStatusContext);

    const color = (): string => {
        if (text === "CONVERT" || text === "PROCESSING") {
            return "danger";
        }
        return "success";
    }

    useEffect(() => {
        // 処理中はボタン操作不可
        if (status === ConvertStatus.PROCESSING) {
            setText("PROCESSING");
            setDisable(true);
        }

        //全ジョブ完了後はテキストを変更する
        if (convertJob.FinishedJobCount === convertJob.TotalJobCount) {
            setText("DONE");
        }

    }, [status, convertJob]);

    /** ボタンクリックイベント */
    const onClickConvertBtn = async () => {
        if (status === ConvertStatus.NONE) {
            setStatus(ConvertStatus.PROCESSING);
        }
    };

    return (
        <section className="convert-btn-box">
            <IonButton className="convert-btn" expand="block" color={color()} onClick={onClickConvertBtn} disabled={disable}>
                {text}
            </IonButton>
        </section>
    )
};