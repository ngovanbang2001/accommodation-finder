import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'
import gallery from '@/assets/images/post-new/gallery.png'
import FormGroup from '../common/FormGroup'
import { convertBase64 } from 'utils/uploadImage'
import { toast } from 'react-toastify'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'
const UploadImages = ({
  base64List,
  setBase64List,
  imageLength,
  setImageLength,
  errorImage,
  setErrorImage,
}) => {
  const [files, setFiles] = useState([])
  const [imageURLS, setImageURLs] = useState([])
  const [overSize, setOverSize] = useState([])

  useEffect(() => {
    if (imageLength > 0 && imageLength < 3) {
      setErrorImage('Cần tối thiểu 3 hình ảnh.')
    } else {
      setErrorImage('')
    }
  }, [imageLength])
  const handleChangeInput = (e) => {
    if (e.target && e.target.files && e.target.files.length) {
      if (e.target.files[0].size > 5 * 1048576) {
        toast.error('Kích thước ảnh quá lớn!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      } else {
        setFiles((files) => files.concat(Array.from(e.target.files)))
      }
    }
  }

  useEffect(() => {
    ;(async () => {
      if (files.length) {
        const newImageUrls = []
        files.slice(0, 10).forEach((image) => newImageUrls.push(URL.createObjectURL(image)))
        setImageURLs(newImageUrls)
        const base64s = await uploadImages(files)
        if (base64s) {
          setBase64List([...base64s])
        }
      }
    })()
  }, [files])

  useEffect(() => {
    if (overSize?.length) {
      const temp = imageURLS
      for (let i = 0; i < temp.length; i++) {
        if (overSize.includes(i)) {
          temp.splice(i, 1)
        }
      }
      const tempFiles = files
      for (let i = 0; i < tempFiles.length; i++) {
        if (overSize.includes(i)) {
          tempFiles.splice(i, 1)
        }
      }
      setImageURLs([...temp])
      setFiles([...tempFiles])
    }
  }, [overSize])

  const uploadImages = async (filesProp) => {
    setImageLength(filesProp.length)
    let base64s = []
    if (files) {
      for (let i = 0; i < filesProp.slice(0, 10).length; i++) {
        const base = await convertBase64(filesProp[i])
        base64s.push(base)
        if (base.length * 0.75 > 10048576) {
          console.log('bca')
          setOverSize((os) => [...os, i])
          setErrorImage('Kích thước ảnh không hợp lệ!')
          toast.error('Kích thước ảnh không hợp lệ!', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          })
          return base64s
        }
      }
    }
    return base64s
  }
  const handleRemoveImage = (index) => {
    const imageSrcTemp = imageURLS.filter((item, idx) => idx !== index)
    const filesTemp = files.filter((item, idx) => idx !== index)
    const base64sTemp = base64List.filter((item, idx) => idx !== index)
    setFiles([...filesTemp])
    setBase64List([...base64sTemp])
    setImageURLs([...imageSrcTemp])
    setImageLength(imageSrcTemp.length)
  }

  useEffect(() => {
    if (base64List?.length === 0) {
      setImageURLs([])
    }
  }, [base64List])
  return (
    <div className="md:w-1/2 w-full">
      <FormGroup isMb={false}>
        <div>
          <div className="font-bold">Hình ảnh</div>
          <div className="flex items-center space-x-1">
            <i className="text-primary fa-regular fa-circle-exclamation"></i>
            <span className="text-sm">
              Tối thiểu <span className="font-bold">3</span> ảnh, tối đa{' '}
              <span className="font-bold">10</span> ảnh.
            </span>
          </div>
          <span className="text-sm italic font-bold">
            * Hình ảnh đầu tiên được sử dụng làm ảnh bìa
          </span>
        </div>

        <div className="w-full h-[250px]">
          <div className="flex flex-wrap">
            {imageURLS.map((imageSrc, index) => (
              <div key={imageSrc} className={'relative w-[100px] h-[75px] m-[3px]'}>
                <Image
                  src={imageSrc}
                  alt="not found"
                  layout="fill"
                  className="border border-gray-200 rounded-lg object-cover"
                />
                <div
                  className="bg-info rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-1 cursor-pointer"
                  onClick={() => handleRemoveImage(index)}
                >
                  <i className="fa-regular fa-xmark text-white text-sm"></i>
                </div>
              </div>
            ))}
            {imageURLS.length > 0 && imageURLS.length < 10 ? (
              <label
                className="flex flex-col justify-center space-y-2 m-[3px]"
                htmlFor="upload-images"
              >
                <div className="border border-dashed border-primary h-[75px] w-[100px] flex items-center justify-center cursor-pointer rounded-lg">
                  <i className="fa-thin fa-cloud-arrow-up text-2xl text-primary"></i>
                </div>
              </label>
            ) : (
              ''
            )}
          </div>
          {imageLength > 10 && (
            <div className="text-sm py-1 text-primary">Chỉ hiển thị tối đa 10 hình ảnh</div>
          )}
          {!imageURLS.length && (
            <div className="w-full">
              <label className="" htmlFor="upload-images">
                <div className="border border-dashed border-primary flex items-center justify-center h-[250px] rounded-lg cursor-pointer">
                  <div className="relative w-24 h-24">
                    <Image src={gallery} layout={'fill'} className={'cover'} alt={'gallery'} />
                  </div>
                </div>
              </label>
            </div>
          )}
        </div>
        <div className="h-[20px]">
          {errorImage && <div className="text-sm text-red-500">{errorImage}</div>}
        </div>
        <input
          type={'file'}
          multiple
          className="hidden"
          id="upload-images"
          onChange={(e) => handleChangeInput(e)}
          accept="image/png, image/jpeg"
        />
      </FormGroup>
    </div>
  )
}

export default UploadImages
