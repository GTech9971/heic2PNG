import "./FileInput.scss";
import { FileUploader } from "react-drag-drop-files";

export interface FileInputProps {
    /** ファイル */
    handler: (file: FileList) => void;
}

const FILE_TYPES: string[] = ["HEIC"];

const FileInput = (props: FileInputProps) => {
    const { handler } = props;
    return (
        <FileUploader handleChange={handler} name="file" multiple={true} types={FILE_TYPES}></FileUploader>
    );
};

export default FileInput;