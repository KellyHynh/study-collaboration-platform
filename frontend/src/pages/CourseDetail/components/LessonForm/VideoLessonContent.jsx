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
        useState(value?.video?.videoUrl || value?.videoUrl || value?.previewUrl || null);

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

        const reader = new FileReader();

        reader.onload = () => {
            const videoUrl = reader.result;

            setVideoPreview(videoUrl);
            onChange?.({
                video: {
                    videoUrl,
                    fileName: file.name,
                    mimeType: file.type,
                },
            });
        };

        reader.readAsDataURL(file);
    }

    // Remove selected video
    function handleRemoveVideo() {
        setVideoPreview(null);

        onChange?.({ video: null });

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
                            {value?.video?.fileName || value?.fileName}
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