import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import MyUploadAdapter from "@/components/my-editor/MyUploadAdapter";

const MyEditor = ({
  onBlurP,
  value,
  placeholder = "Gõ nội dung vào đây. Kéo & thả hình để chèn vào bài. Chọn các đoạn chữ để hiện công cụ định dạng...",
}) => {
  const configEditor = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "fontFamily",
      "fontColor",
      "fontSize",
      "bulletedList",
      "numberedList",
      "uploadImage",
      "imageStyle",
      "mediaEmbed",
      "|",
      "undo",
      "redo",
      "link",
      "alignment",
    ],
    // toolbar: [
    //   "heading",
    //   "|",
    //   "bold",
    //   "italic",
    //   "underline",
    //   "fontSize",
    //   "link",
    //   "bulletedList",
    //   "numberedList",
    //   "uploadImage",
    //   "mediaEmbed",
    //   "|",
    //   "undo",
    //   "redo",
    //   "alignment",
    // ],

    placeholder: placeholder,
    extraPlugins: [MyCustomUploadAdapterPlugin],
    image: {
      style: ["full", "side", "alignLeft", "alignRight"],
      toolbar: [
        "imageStyle:alignLeft",
        "imageStyle:alignCenter",
        "imageStyle:alignRight",
      ],
    },
    mediaEmbed: { previewsInData: true },
  };

  function whenUploadImageDone(attachment, key) {
    // TODO: done upload ne
    const name = attachment.directUrl.split("/").pop();
  }

  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      // a.onDone(whenUploadImageDone);
      return new MyUploadAdapter(loader);
    };
  }

  return (
    <div className={`relative rounded-md font-light`}>
      <div className={`min-h-[200px] rounded-md`}>
        <CKEditor
          editor={Editor}
          config={configEditor}
          data={value}
          onBlur={(event, editor) => {
            const res = editor.getData();
            onBlurP({ res });
            MyCustomUploadAdapterPlugin(editor);
          }}
        />
      </div>
    </div>
  );
};

export default MyEditor;
