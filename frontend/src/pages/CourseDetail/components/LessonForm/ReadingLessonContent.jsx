import { useState } from "react";

import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import FileUpload from "@/components/FileUpload/FileUpload";
import Icon from "@/components/Icon/Icon";
import "./ReadingLessonCOntent.scss"
import bem from "@/utils/bem";

const b = bem("reading-content");

function ReadingLessonContent({
    value,
    onChange,
}) {
    const [body, setBody] = useState(
        value?.body || null
    );

    const [attachments, setAttachments] =
        useState(value?.attachments || []);

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

        const newAttachments =
            selectedFiles.map((file) => ({
                id: crypto.randomUUID(),
                file,
                fileName: file.name,
                mimeType: file.type,
                type: getFileType(file),
                previewUrl:
                    file.type ===
                    "application/pdf"
                        ? URL.createObjectURL(file)
                        : null,
            }));

        const updatedAttachments = [
            ...attachments,
            ...newAttachments,
        ];

        setAttachments(updatedAttachments);

        onChange?.({
            body,
            attachments: updatedAttachments,
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
        const attachment =
            attachments.find(
                (item) =>
                    item.id === attachmentId
            );

        // Release temporary preview URL
        if (attachment?.previewUrl) {
            URL.revokeObjectURL(
                attachment.previewUrl
            );
        }

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

    return (
        <div className={b()}>

            {/* Reading content */}
            <div className={b("field")}>

                <label className={b("label")}>
                    Nội dung bài đọc
                </label>

                <div className={b("editor")}>
                    <RichTextEditor
                        content={body}
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

                        {attachments.map(
                            (attachment) => (
                                <div
                                    key={
                                        attachment.id
                                    }
                                    className={b(
                                        "attachment"
                                    )}
                                >

                                    <div
                                        className={b(
                                            "attachment-info"
                                        )}
                                    >

                                        <span
                                            className={b(
                                                "attachment-icon"
                                            )}
                                        >
                                            <Icon name="course" />
                                        </span>

                                        <span
                                            className={b(
                                                "attachment-name"
                                            )}
                                        >
                                            {
                                                attachment.fileName
                                            }
                                        </span>

                                    </div>

                                    {/* Remove attachment */}
                                    <button
                                        type="button"
                                        className={b(
                                            "attachment-remove"
                                        )}
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
                            )
                        )}

                    </div>
                )}

            </div>

        </div>
    );
}

export default ReadingLessonContent;