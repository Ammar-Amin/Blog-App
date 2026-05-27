import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { useRef } from "react";

// Import TinyMCE core + plugins + theme (self-hosted)
import "tinymce/tinymce";
import "tinymce/themes/silver";
import "tinymce/icons/default";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/code";
import "tinymce/plugins/help";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/emoticons/js/emojis";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/preview";
import "tinymce/plugins/charmap";
import "tinymce/plugins/anchor";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/advlist";

// Import TinyMCE skins (required for self-hosted)
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/content/default/content.min.css";

export default function RTE({ name, control, label, defaultValue = "" }) {
  const editorRef = useRef(null);

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-2 pl-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            onInit={(evt, editor) => {
              editorRef.current = editor;
            }}
            value={value}
            onEditorChange={onChange}
            init={{
              base_url: "/tinymce",
              // No API key needed with GPL license
              license_key: "gpl",
              //  loads skins from CDN, core from npm
              skin_url:
                "https://cdn.tiny.cloud/1/no-api-key/tinymce/7/skins/ui/oxide",
              content_css:
                "https://cdn.tiny.cloud/1/no-api-key/tinymce/7/skins/content/default/content.min.css",

              height: 500,
              min_height: 300,
              menubar: true,

              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
                "emoticons",
                "pagebreak",
                "nonbreaking",
              ],

              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "link image media table emoticons | removeformat | help | code preview",

              toolbar_mode: "sliding",

              content_style: `
                body { 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
                  font-size: 16px; 
                  line-height: 1.6; 
                  color: #1f2937;
                  padding: 16px;
                }
                img { max-width: 100%; height: auto; border-radius: 8px; }
                blockquote { border-left: 4px solid #e5e7eb; padding-left: 16px; margin-left: 0; color: #6b7280; }
                pre { background: #f3f4f6; padding: 12px; border-radius: 6px; overflow-x: auto; }
              `,

              // Image handling
              image_advtab: true,
              image_title: true,
              automatic_uploads: false, // Handle via Appwrite separately if needed
              file_picker_types: "image",

              // Better UX
              branding: false,
              promotion: false,
              statusbar: true,
              resize: true,
              autoresize_bottom_margin: 50,

              // Spellcheck
              browser_spellcheck: true,

              // Cleanup pasted content
              paste_data_images: false,
              paste_as_text: false,
              paste_remove_styles: true,
              paste_remove_spans: true,
              paste_strip_class_attributes: "all",
            }}
          />
        )}
      />
    </div>
  );
}
