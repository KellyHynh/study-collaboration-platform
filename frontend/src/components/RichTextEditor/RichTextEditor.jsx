import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Icon from "@/components/Icon/Icon";
import { useEffect } from "react";
import bem from "@/utils/bem";

import "./RichTextEditor.scss";

const b = bem("rich-text-editor");

function RichTextEditor({ value, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],

        content: value || {
            type: "doc",
            content: [
                {
                    type: "paragraph",
                },
            ],
        },

        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        },

        immediatelyRender: false,
    });

    useEffect(() => {
        if (!editor || !value) return;

        editor.commands.setContent(value, false);
    }, [editor, value]);

    if (!editor) {
        return null;
    }

    return (
        <div className={b()}>

            {/* Toolbar */}

            <div className={b("toolbar")}>

                {/* Bold */}

                <button
                    type="button"
                    className={b("button", {
                        active: editor.isActive("bold"),
                    })}
                    onClick={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                    title="In đậm"
                >
                    <Icon name="bold" />
                </button>


                {/* Italic */}

                <button
                    type="button"
                    className={b("button", {
                        active: editor.isActive("italic"),
                    })}
                    onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                    title="In nghiêng"
                >
                    <Icon name="italic" />
                </button>


                {/* Underline */}

                <button
                    type="button"
                    className={b("button", {
                        active: editor.isActive("underline"),
                    })}
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                    title="Gạch chân"
                >
                    <Icon name="underline" />
                </button>


                <span className={b("divider")} />


                {/* Heading 1 */}

                <button
                    type="button"
                    className={b("button", {
                        active: editor.isActive("heading", {
                            level: 2,
                        }),
                    })}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run()
                    }
                    title="Tiêu đề"
                >
                    <Icon name="heading" />
                </button>


                {/* Bullet list */}

                <button
                    type="button"
                    className={b("button", {
                        active: editor.isActive("bulletList"),
                    })}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleBulletList()
                            .run()
                    }
                    title="Danh sách"
                >
                    <Icon name="list" />
                </button>


                {/* Ordered list */}

                <button
                    type="button"
                    className={b("button", {
                        active: editor.isActive("orderedList"),
                    })}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleOrderedList()
                            .run()
                    }
                    title="Danh sách đánh số"
                >
                    <Icon name="list-ordered" />
                </button>


                <span className={b("divider")} />


                {/* Align left */}

                <button
                    type="button"
                    className={b("button", {
                        active: editor.isActive({
                            textAlign: "left",
                        }),
                    })}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .setTextAlign("left")
                            .run()
                    }
                    title="Căn trái"
                >
                    <Icon name="align-left" />
                </button>


                {/* Align center */}

                <button
                    type="button"
                    className={b("button", {
                        active: editor.isActive({
                            textAlign: "center",
                        }),
                    })}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .setTextAlign("center")
                            .run()
                    }
                    title="Căn giữa"
                >
                    <Icon name="align-center" />
                </button>


                {/* Align right */}

                <button
                    type="button"
                    className={b("button", {
                        active: editor.isActive({
                            textAlign: "right",
                        }),
                    })}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .setTextAlign("right")
                            .run()
                    }
                    title="Căn phải"
                >
                    <Icon name="align-right" />
                </button>


                <span className={b("divider")} />


                {/* Link */}

                <button
                    type="button"
                    className={b("button", {
                        active: editor.isActive("link"),
                    })}
                    onClick={() => {
                        const previousUrl =
                            editor.getAttributes("link").href;

                        const url = window.prompt(
                            "Nhập URL:",
                            previousUrl || ""
                        );

                        if (url === null) return;

                        if (url === "") {
                            editor
                                .chain()
                                .focus()
                                .unsetLink()
                                .run();

                            return;
                        }

                        editor
                            .chain()
                            .focus()
                            .setLink({ href: url })
                            .run();
                    }}
                    title="Thêm liên kết"
                >
                    <Icon name="link" />
                </button>


                {/* Undo */}

                <button
                    type="button"
                    className={b("button")}
                    onClick={() =>
                        editor.chain().focus().undo().run()
                    }
                    disabled={
                        !editor.can().chain().focus().undo().run()
                    }
                    title="Hoàn tác"
                >
                    <Icon name="undo" />
                </button>


                {/* Redo */}

                <button
                    type="button"
                    className={b("button")}
                    onClick={() =>
                        editor.chain().focus().redo().run()
                    }
                    disabled={
                        !editor.can().chain().focus().redo().run()
                    }
                    title="Làm lại"
                >
                    <Icon name="redo" />
                </button>

            </div>


            {/* Editor */}

            <EditorContent
                editor={editor}
                className={b("content")}
            />

        </div>
    );
}

export default RichTextEditor;