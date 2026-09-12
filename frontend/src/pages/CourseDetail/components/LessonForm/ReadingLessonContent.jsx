import { useState } from "react";

import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import FileUpload from "@/components/FileUpload/FileUpload";
import Icon from "@/components/Icon/Icon";
import "./ReadingLessonContent.scss"
import bem from "@/utils/bem";
// Reusable file preview
import FilePreview from "@/components/FilePreview/FilePreview";

const b = bem("reading-content");

function ReadingLessonContent({
    value,
    onChange,
}) {
    const [body, setBody] = useState(
        value?.body || null
    );

    const [attachments, setAttachments] =
        useState((value?.attachments || []).map((attachment) => ({
            ...attachment,
            type: attachment.type || getFileTypeFromMime(attachment.mimeType),
            previewUrl: attachment.previewUrl || attachment.fileUrl,
        })));

    function getFileTypeFromMime(mimeType) {
        return mimeType === "application/pdf" ? "pdf" : "file";
    }

    // Update reading body
    function handleBodyChange(newContent) {
        setBody(newContent);

        onChange?.({
            body: newContent,
            attachments,
        });
    }

    // Add selected files
    function handleFilesChange(files) {
        const selectedFiles = Array.isArray(files)
            ? files
            : [files];

        // Check selected files
        console.log(
            "Selected files:",
            selectedFiles
        );

        selectedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                const newAttachment = {
                    id: crypto.randomUUID(),
                    fileUrl: reader.result,
                    fileName: file.name,
                    mimeType: file.type,
                    type: getFileType(file),
                    previewUrl: reader.result,
                    isPreviewOpen: false,
                };
                const updatedAttachments = [...attachments, newAttachment];

                setAttachments(updatedAttachments);
                onChange?.({ body, attachments: updatedAttachments });
            };

            reader.readAsDataURL(file);
        });
    }

    // Determine attachment type
    function getFileType(file) {
        if (
            file.type ===
            "application/pdf"
        ) {
            return "pdf";
        }

        if (
            file.type ===
                "application/vnd.ms-powerpoint" ||
            file.type ===
                "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ) {
            return "ppt";
        }

        return "file";
    }

    // Remove attachment
    function handleRemoveAttachment(
        attachmentId
    ) {
        const updatedAttachments =
            attachments.filter(
                (item) =>
                    item.id !== attachmentId
            );

        setAttachments(updatedAttachments);

        onChange?.({
            body,
            attachments: updatedAttachments,
        });

    }

    // Toggle PDF preview
    function handleTogglePreview(attachmentId) {
        const updatedAttachments = attachments.map(
            (attachment) => {
                if (attachment.id !== attachmentId) {
                    return attachment;
                }

                return {
                    ...attachment,
                    isPreviewOpen:
                        !attachment.isPreviewOpen,
                };
            }
        );

        setAttachments(updatedAttachments);

        // Update lesson content
        onChange?.({
            body,
            attachments: updatedAttachments,
        });
    }

    return (
        <div className={b()}>

            {/* Reading content */}
            <div className={b("field")}>

                <label className={b("label")}>
                    Nội dung bài đọc
                </label>

                <div className={b("editor")}>
                        <RichTextEditor
                            value={body}
                        onChange={handleBodyChange}
                    />
                </div>

            </div>


            {/* Attachments */}
            <div className={b("attachments")}>

                <div
                    className={b(
                        "attachments-header"
                    )}
                >

                    <div>
                        <span className={b("label")}>
                            Tài liệu bài đọc
                        </span>

                        <p className={b("hint")}>
                            Có thể thêm PDF hoặc PPT
                            để người học xem trực tiếp
                            trong bài.
                        </p>
                    </div>

                    {/* Reusable file upload */}
                    <FileUpload
                        accept=".pdf,.ppt,.pptx"
                        multiple
                        onChange={
                            handleFilesChange
                        }
                    />

                </div>


                {/* Attachment list */}
                {attachments.length > 0 && (
                    <div
                        className={b(
                            "attachment-list"
                        )}
                    >

                        {attachments.map((attachment) => (
                            <div
                                key={attachment.id}
                                className={b("attachment")}
                            >
                                {/* Attachment row */}
                                <div className={b("attachment-row")}>
                                    <div className={b("attachment-info")}>
                                        <span className={b("attachment-icon")}>
                                            <Icon name="course" />
                                        </span>

                                        <span className={b("attachment-name")}>
                                            {attachment.fileName}
                                        </span>
                                    </div>

                                    <div className={b("attachment-actions")}>
                                        {/* PDF preview button */}
                                        {attachment.type === "pdf" && (
                                            <button
                                                type="button"
                                                className={b("attachment-preview")}
                                                onClick={() =>
                                                    handleTogglePreview(
                                                        attachment.id
                                                    )
                                                }
                                            >
                                                {attachment.isPreviewOpen
                                                    ? "Ẩn PDF"
                                                    : "Xem PDF"}
                                            </button>
                                        )}

                                        {/* Remove attachment */}
                                        <button
                                            type="button"
                                            className={b("attachment-remove")}
                                            onClick={() =>
                                                handleRemoveAttachment(
                                                    attachment.id
                                                )
                                            }
                                            aria-label="Xóa tài liệu"
                                        >
                                            <Icon name="close" />
                                        </button>
                                    </div>
                                </div>

                                {/* Reusable PDF preview */}
                                {attachment.isPreviewOpen && (
                                    <FilePreview
                                        file={attachment}
                                        type={attachment.type}
                                    />
                                )}
                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default ReadingLessonContent;