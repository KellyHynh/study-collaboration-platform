import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import bem from "../../utils/bem";
import "./RichTextRenderer.scss";

const b = bem("rich-text-renderer");

function RichTextRenderer({ content }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],

        content: content || {
            type: "doc",
            content: [
                {
                    type: "paragraph",
                },
            ],
        },

        editable: false,
        immediatelyRender: false,
    });

    if (!editor) {
        return null;
    }

    return (
        <div className={b()}>
            <EditorContent editor={editor} />
        </div>
    );
}

export default RichTextRenderer;