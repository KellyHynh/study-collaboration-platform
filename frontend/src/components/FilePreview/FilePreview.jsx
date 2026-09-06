import bem from "@/utils/bem";

import "./FilePreview.scss";

const b = bem("file-preview");

function FilePreview({
    file,
    type,
}) {
    // Only PDF preview is supported for now
    if (type !== "pdf" || !file?.previewUrl) {
        return null;
    }

    return (
        <div className={b()}>
            {/* PDF viewer */}
            <iframe
                src={file.previewUrl}
                title={file.fileName || "PDF preview"}
            />
        </div>
    );
}

export default FilePreview;