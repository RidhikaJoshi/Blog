import React from 'react'
import {Editor} from '@tinymce/tinymce-react';

function WriteBlogs() {
  return (
    <div className='w-full min-h-[85vh] flex items-center justify-center'>
        <div className='min-h-[85vh] w-[50%] flex flex-col items-center justify-center text-xl font-medium gap-10 p-10'>
            <Editor 
            initialValue='default value'
            init={
              {branding: false,
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            }
            }/>
       

        </div>
    </div>
  )
}

export default WriteBlogs