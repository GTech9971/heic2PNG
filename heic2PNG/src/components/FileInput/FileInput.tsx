import React from "react";
import { FileUploader } from "react-drag-drop-files";

export interface FileInputProps {
    text: string;
    handler: (file: FileList) => void;
}

const FILE_TYPES = ["HEIC"];

const FileInput = (props: FileInputProps) => {
    const { text, handler } = props;
    return (
        <FileUploader label={text} handleChange={handler} name="file" multiple={true} types={FILE_TYPES}></FileUploader>
    );
};

export default FileInput;