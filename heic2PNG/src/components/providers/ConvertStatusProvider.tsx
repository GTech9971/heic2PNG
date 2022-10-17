import { createContext, Dispatch, SetStateAction, useState } from "react";
import { ConvertStatus } from "../../model/ConvertStatus";

export const convertStatusContext = createContext<ConvertStatus>(ConvertStatus.NONE);
export const setConvertStatusContext = createContext<Dispatch<SetStateAction<ConvertStatus>>>(
    () => undefined
);

export interface ConvertStatusContextProp {
    children: React.ReactNode;
}

export const ConvertStatusProvider = (props: ConvertStatusContextProp) => {
    const { children } = props;
    const [status, setStatus] = useState<ConvertStatus>(ConvertStatus.NONE);

    return (
        <convertStatusContext.Provider value={status}>
            <setConvertStatusContext.Provider value={setStatus}>
                {children}
            </setConvertStatusContext.Provider>
        </convertStatusContext.Provider>
    )
};