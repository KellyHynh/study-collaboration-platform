import { useState } from "react";

import Icon from "@/components/Icon/Icon";
import RichTextRenderer from "@/components/RichTextRenderer/RichTextRenderer";
import FilePreview from "@/components/FilePreview/FilePreview";
import bem from "@/utils/bem";

const b = bem("lesson-content");

function formatDuration(seconds = 0) {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function LessonContent({ lesson, course, onComplete, isCompleted, progressMessage }) {
    const [notes, setNotes] = useState("");
    const body = lesson.content?.body;
    const attachments = lesson.content?.attachments || [];

    const getAttachmentType = (attachment) =>
        attachment.mimeType === "application/pdf" ? "pdf" : "file";

    return (
        <div className={b()}>
            {lesson.type === "video" && (
                <div className={b("video")}>{lesson.video?.videoUrl ? <video src={lesson.video.videoUrl} controls /> : <p>Video chưa được cung cấp.</p>}</div>
            )}
            {lesson.type === "reading" && <article className={b("reading")}><RichTextRenderer content={body} /></article>}

            {lesson.type === "reading" && attachments.length > 0 && <section className={b("attachments")}><h2>Tài liệu</h2>{attachments.map((attachment) => <div key={attachment.id} className={b("attachment")}><a href={attachment.fileUrl} target="_blank" rel="noreferrer"><Icon name="course" size={18} /> {attachment.fileName} <span>↗</span></a><FilePreview file={attachment} type={getAttachmentType(attachment)} /></div>)}</section>}

            <section className={b("info")}>
                <div><span className={b("eyebrow")}>{lesson.type === "reading" ? "Bài đọc" : "Bài giảng video"}</span><h1>{lesson.title}</h1></div>
                <div className={b("metadata")}><span>{course?.instructor?.name || "KnoVerse"}</span><span><Icon name="time" size={16} /> {formatDuration(lesson.durationSeconds)}</span></div>
                {!isCompleted && <button type="button" className={b("complete")} onClick={onComplete}>Đánh dấu hoàn thành</button>}
                {isCompleted && <span className={b("completed")}><Icon name="done" size={18} /> Đã hoàn thành</span>}
                {progressMessage && <p className={b("message")}>{progressMessage}</p>}
            </section>

            <section className={b("notes")}>
                <h2>Ghi chú</h2>
                <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Ghi chú của bạn..." />
                <button type="button" disabled title="API ghi chú chưa được backend hỗ trợ">Lưu ghi chú</button>
                <p>Chức năng lưu ghi chú sẽ khả dụng khi backend có API ghi chú.</p>
            </section>
        </div>
    );
}

export default LessonContent;
