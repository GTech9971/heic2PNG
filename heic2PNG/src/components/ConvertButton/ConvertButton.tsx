import "./ConvertButton.css";
import { IonButton } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { ConvertStatus } from "../../model/ConvertStatus";
import { ConvertJobData } from "../../model/ConvertJobData";
import { convertJobContext, setConvertJobContext } from "../providers/ConvertJobStatusProvider";

export const ConvertButton = () => {
    // ジョブ管理
    const convertJob: ConvertJobData = useContext<ConvertJobData>(convertJobContext);
    const setConvertJob = useContext(setConvertJobContext);

    const [text, setText] = useState<"CONVERT" | "PROCESSING" | "DONE">("CONVERT");
    const [disable, setDisable] = useState<boolean>(true);

    const color = (): string => {
        if (text === "CONVERT" || text === "PROCESSING") {
            return "danger";
        }
        return "success";
    }

    useEffect(() => {
        //ファイル数が0件の場合、ボタン押下不可        
        if (convertJob.TotalJobCount === 0) {
            setDisable(true);
        } else {
            setDisable(false);
        }

        // 処理中はボタン操作不可
        if (convertJob.WholeStatus === ConvertStatus.PROCESSING) {
            setText("PROCESSING");
            setDisable(true);
        }

        //全ジョブ完了後はテキストを変更する
        if (convertJob.WholeStatus === ConvertStatus.DONE) {
            setText("DONE");
        }

    }, [convertJob]);

    /** ボタンクリックイベント */
    const onClickConvertBtn = async () => {
        if (convertJob.WholeStatus === ConvertStatus.NONE) {
            //全体へ変換開始
            setConvertJob((prevState => ({ ...prevState, WholeStatus: ConvertStatus.PROCESSING })));
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