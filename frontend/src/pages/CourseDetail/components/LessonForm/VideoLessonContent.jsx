import { useRef, useState } from "react";
import "./VideoLessonContent.scss";
import Icon from "@/components/Icon/Icon";

import bem from "@/utils/bem";

const b = bem("video-content");

function VideoLessonContent({
    value,
    onChange,
}) {
    const inputRef = useRef(null);

    const [videoPreview, setVideoPreview] =
        useState(value?.previewUrl || null);

    // Open the browser file picker
    function handleChooseVideo() {
        inputRef.current?.click();
    }

    // Handle selected video file
    function handleVideoChange(event) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        // Create a temporary local URL for preview
        const previewUrl =
            URL.createObjectURL(file);

        setVideoPreview(previewUrl);

        // Store video metadata for the lesson form
        onChange?.({
            file,
            fileName: file.name,
            mimeType: file.type,
            previewUrl,
        });
    }

    // Remove selected video
    function handleRemoveVideo() {
        setVideoPreview(null);

        onChange?.(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    return (
        <div className={b()}>

            <label className={b("label")}>
                Video bài giảng
            </label>

            <input
                ref={inputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                hidden
            />

            {!videoPreview && (
                <button
                    type="button"
                    className={b("upload")}
                    onClick={handleChooseVideo}
                >
                    <Icon name="plus" />

                    <span>
                        Chọn video
                    </span>

                    <small>
                        MP4, WebM hoặc định dạng video
                        được trình duyệt hỗ trợ
                    </small>
                </button>
            )}

            {videoPreview && (
                <div className={b("preview")}>

                    <video
                        src={videoPreview}
                        controls
                    />

                    <div className={b("file")}>

                        <span>
                            {value?.fileName}
                        </span>

                        <button
                            type="button"
                            onClick={handleRemoveVideo}
                            aria-label="Xóa video"
                        >
                            <Icon name="close" />
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}

export default VideoLessonContent;