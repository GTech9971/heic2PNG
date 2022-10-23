import React, { createContext, Dispatch, SetStateAction, useState } from "react";
import { ConvertJobData } from "../../model/ConvertJobData";
import { ConvertStatus } from "../../model/ConvertStatus";

/**
 * 変換ジョブ
 */
export const convertJobContext = createContext<ConvertJobData>({
    FinishedJobCount: 0,
    TotalJobCount: 0,
    WholeStatus: ConvertStatus.NONE,
});

export const setConvertJobContext = createContext<Dispatch<SetStateAction<ConvertJobData>>>(
    () => undefined
);

export interface ConvertJobContextProp {
    children: React.ReactNode;
}

export const ConvertJobProvider = (props: ConvertJobContextProp) => {
    const { children } = props;
    const [convertJob, setConvertJob] = useState<ConvertJobData>({
        FinishedJobCount: 0,
        TotalJobCount: 0,
        WholeStatus: ConvertStatus.NONE,
    });

    return (
        <convertJobContext.Provider value={convertJob}>
            <setConvertJobContext.Provider value={setConvertJob}>
                {children}
            </setConvertJobContext.Provider>
        </convertJobContext.Provider>
    )
};