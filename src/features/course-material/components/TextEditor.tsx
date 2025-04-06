import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";
import { Editor } from "@tiptap/react";
import { useEffect } from "react";
import icons from "@/assets/icons/icons";
import React from "react";

/*
import {
  FaBold,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";

*/

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="p-4 flex bg-black rounded-t-md items-center justify-center">
      <div className="flex flex-row gap-6">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "is-active"
              : ""
          }
        >
          {icons.h1Icon(editor.isActive("heading", { level: 1 }))}
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          {icons.h2Icon(editor.isActive("heading", { level: 2 }))}
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          {icons.h3Icon(editor.isActive("heading", { level: 3 }))}
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "" : ""}
        >
          {icons.textIcon(editor.isActive("paragraph"))}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          {icons.boldIcon(editor.isActive("bold"))}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          {icons.italicIcon(editor.isActive("italic"))}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          {icons.strikeIcon(editor.isActive("strike"))}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive("highlight") ? "is-active" : ""}
        >
          {icons.highlightIcon(editor.isActive("highlight"))}
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          {icons.alignLeftIcon(editor.isActive({ textAlign: "left" }))}
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
        >
          {icons.alignCenterIcon(editor.isActive({ textAlign: "center" }))}
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          {icons.alignRightIcon(editor.isActive({ textAlign: "right" }))}
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
          }
        >
          {icons.alignJustifyIcon(
            editor.isActive({ textAlign: "justify" })
          )}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          {icons.bulletListIcon(editor.isActive("bulletList"))}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
          >
           {icons.orderedListIcon(editor.isActive("orderedList"))}
        </button>
      </div>
    </div>
  );
};

interface TipTapProps {
  content: string;
}

export const Tiptap: React.FC<TipTapProps> = ({ content }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      BulletList,
      ListItem,
      Document,
      Paragraph,
      Text,
    ],
    content: content,
  });

  // useEffect to update content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  return (
    <div className="textEditor bg-card rounded-md overflow-auto">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="px-6 py-5" />
    </div>
  );
};
