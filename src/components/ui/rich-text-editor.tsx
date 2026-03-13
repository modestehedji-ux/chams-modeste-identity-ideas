import React, { useCallback, useRef } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Palette
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  label?: string;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      editor.chain().focus().setImage({ src: publicUrl }).run();
      toast({ title: "Image ajoutée avec succès" });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({ 
        title: "Erreur lors de l'upload", 
        description: error.message || "Impossible d'uploader l'image",
        variant: "destructive"
      });
      
      const url = window.prompt("URL de l'image (l'upload direct a échoué) :");
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }
    
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const setFontFamily = (e: React.ChangeEvent<HTMLSelectElement>) => {
    editor.chain().focus().setFontFamily(e.target.value).run();
  };

  const addImageCallback = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-sm transition-colors ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border p-2 bg-card rounded-t-sm">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="Gras"
      >
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="Italique"
      >
        <Italic size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        title="Barré"
      >
        <Strikethrough size={16} />
      </ToolbarButton>

      <div className="w-px h-6 bg-border mx-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
        title="Titre 1"
      >
        <Heading1 size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        title="Titre 2"
      >
        <Heading2 size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
        title="Titre 3"
      >
        <Heading3 size={16} />
      </ToolbarButton>

      <div className="w-px h-6 bg-border mx-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        title="Liste à puces"
      >
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        title="Liste numérotée"
      >
        <ListOrdered size={16} />
      </ToolbarButton>

      <div className="w-px h-6 bg-border mx-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
        title="Aligner à gauche"
      >
        <AlignLeft size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
        title="Centrer"
      >
        <AlignCenter size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
        title="Aligner à droite"
      >
        <AlignRight size={16} />
      </ToolbarButton>

      <div className="w-px h-6 bg-border mx-1" />
      
      <div className="flex items-center mx-1 gap-2">
         <Type size={16} className="text-muted-foreground" />
         <select 
            onChange={setFontFamily} 
            className="bg-transparent text-sm text-foreground focus:outline-none w-24 border border-border rounded-sm h-7"
         >
             <option value="">Par défaut</option>
             <option value="Inter, sans-serif">Inter</option>
             <option value="Georgia, serif">Georgia</option>
             <option value="'Playfair Display', serif">Playfair Display</option>
             <option value="monospace">Monospace</option>
             <option value="Arial, Helvetica, sans-serif">Arial</option>
         </select>
      </div>

       <div className="flex items-center mx-1 relative" title="Couleur du texte">
          <Palette size={16} className="text-muted-foreground mr-1" />
          <input
             type="color"
             onInput={(event: any) => editor.chain().focus().setColor(event.target.value).run()}
             value={editor.getAttributes('textStyle').color || '#000000'}
             className="w-6 h-6 p-0 border-0 bg-transparent rounded-sm cursor-pointer"
          />
      </div>

      <div className="w-px h-6 bg-border mx-1" />

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />
      <ToolbarButton onClick={addImageCallback} title="Insérer une image">
        <ImageIcon size={16} />
      </ToolbarButton>
    </div>
  );
};

export const RichTextEditor = ({ content, onChange, label, placeholder }: RichTextEditorProps) => {
  const [isMounted, setIsMounted] = React.useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-md max-w-full my-4',
        },
      }),
      TextStyle,
      Color,
      FontFamily,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base dark:prose-invert prose-p:my-2 prose-headings:my-4 prose-img:mx-auto max-w-none w-full bg-secondary/30 min-h-[300px] border border-t-0 border-border rounded-b-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-y",
      },
    },
  });

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col w-full">
      {label && <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">{label}</label>}
      <div className="border border-border rounded-sm shadow-sm">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
