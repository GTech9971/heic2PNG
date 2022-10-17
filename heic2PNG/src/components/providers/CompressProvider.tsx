import { createContext, Dispatch, SetStateAction, useState } from "react";
import { CompressData } from "../../model/CompressData";

/**
 * 圧縮データ
 */
export const compressContext = createContext<CompressData>({
    isCompress: false,
    CompressLevel: null
});

/**
 * 圧縮データのhook
 */
export const setCompressContext = createContext<Dispatch<SetStateAction<CompressData>>>(
    () => undefined
);

export interface CompressContextProp {
    children: React.ReactNode;
}

export const CompressProvider = (props: CompressContextProp) => {
    const { children } = props;
    const [compress, setCompress] = useState<CompressData>({
        isCompress: false,
        CompressLevel: null
    });

    return (
        <compressContext.Provider value={compress}>
            <setCompressContext.Provider value={setCompress}>
                {children}
            </setCompressContext.Provider>
        </compressContext.Provider>
    )
};