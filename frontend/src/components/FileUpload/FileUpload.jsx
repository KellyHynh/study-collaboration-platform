import { useRef } from "react";

import Icon from "@/components/Icon/Icon";

import bem from "@/utils/bem";
import "./FileUpload.scss";

const b = bem("file-upload");

function FileUpload({
    accept,
    multiple = false,
    onChange,
}) {
    const inputRef = useRef(null);

    // Open the browser file picker
    function handleOpenPicker() {
        inputRef.current?.click();
    }

    // Handle selected files
    function handleFileChange(event) {
        const files = Array.from(
            event.target.files || []
        );

        if (!files.length) {
            return;
        }

        onChange?.(multiple ? files : files[0]);

        // Allow selecting the same file again
        event.target.value = "";
    }

    return (
        <div className={b()}>

            {/* Hidden native file input */}
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleFileChange}
                hidden
            />

            {/* Upload button */}
            <button
                type="button"
                className={b("button")}
                onClick={handleOpenPicker}
            >
                <Icon name="plus" />

                <span>
                    Thêm tài liệu
                </span>
            </button>

        </div>
    );
}

export default FileUpload;