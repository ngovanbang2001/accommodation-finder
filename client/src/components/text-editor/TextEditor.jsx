import React, { Fragment } from 'react'
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false
import { Controller } from 'react-hook-form'
const TOOLBAR_OPTIONS = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],

  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ['clean'],
]
const TextEditor = ({ options, control, name, placeholder, error }) => {
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactQuill
            theme="snow"
            placeholder="Mô tả tin đăng..."
            {...field}
            style={{ fontSize: '16px' }}
            onChange={(text) => {
              field.onChange(text)
            }}
            modules={{
              toolbar: {
                container: TOOLBAR_OPTIONS,
              },
            }}
          />
        )}
      />
      {error?.length > 0 && <span className="text-red-500 mt-1 text-sm font-normal">{error}</span>}
    </Fragment>
  )
}

export default TextEditor
