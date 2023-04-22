import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../common/FormGroup'
import { Label } from '../label'
import MySelect from '../select/Select'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import ButtonPrimary from '../button/ButtonPrimary'
import TextArea from '../input/TextArea'
import ButtonError from '../button/ButtonError'
import { toast } from 'react-toastify'
import { Input } from '../input'
import { PostTypeAPI } from 'apis/post-type'
import ModalComfirmDeleteNew from './ModalComfirmDeleteNew'
import { formatPrice } from 'utils/common'
const ModalCreatePostType = ({ id, selectedPostType, isEdit, updatePostTypes }) => {
  const modalCreatePostTypeRef = useRef(null)
  const [dataProps, setDataProps] = useState(null)
  const schema = yup.object({
    title: yup.string().required('Vui lòng nhập loại tin'),
    description: yup.string().required('Vui lòng nhập mô tả'),
    features: yup.string().required('Vui lòng nhập tính năng'),
    priceForDay: yup
      .number()
      .typeError('Giá theo ngày phải là một số dương')
      .required('Vui lòng nhập giá theo ngày')
      .positive('Giá theo ngày phải là một số dương'),
    priceForMonth: yup
      .number()
      .typeError('Giá theo tháng phải là một số dương')
      .required('Vui lòng nhập giá theo tháng')
      .positive('Giá theo tháng phải là một số dương'),
    priceForWeek: yup
      .number()
      .typeError('Giá theo tuần phải là một số dương')
      .required('Vui lòng nhập giá theo tuần')
      .positive('Giá theo tuần phải là một số dương'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (selectedPostType) {
      const { title, description, features, priceForDay, priceForMonth, priceForWeek } =
        selectedPostType
      setDataProps({
        title,
        description,
        features,
        priceForDay,
        priceForMonth,
        priceForWeek,
      })
      reset({
        title,
        description,
        features,
        priceForDay,
        priceForMonth,
        priceForWeek,
      })
    }
  }, [selectedPostType])
  const handleCreatePostType = async (values) => {
    try {
      if (!isEdit) {
        const res = await PostTypeAPI.createPostType({ ...values, status: 1 })
        if (res.postType) {
          updatePostTypes(res.postType, 'add')
          reset({
            title: '',
            description: '',
            features: '',
            priceForDay: '',
            priceForMonth: '',
            priceForWeek: '',
          })
          modalCreatePostTypeRef.current.click()
          toast.success('Tạo loại tin thành công!', {
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
          toast.error('Đã có lỗi xảy ra!', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          })
        }
      } else {
        const data = {}
        const aProps = Object.keys(dataProps)
        aProps.forEach((prop) => {
          if (dataProps[prop] !== values[prop]) {
            data[prop] = values[prop]
          }
        })
        updatePostTypes({
          ...selectedPostType,
          ...values,
        })
        const res = await PostTypeAPI.updatePostType({
          id: selectedPostType.id,
          data,
        })
        if (res.ok) {
          modalCreatePostTypeRef.current.click()
          toast.success('Cập nhật thông tin thành công!', {
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
          toast.error('Đã có lỗi xảy ra!', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          })
        }
      }
    } catch (e) {
      console.log(e)
      toast.error('Đã có lỗi xảy ra!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    }
  }

  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal">
        <div className="modal-box relative w-10/12 max-w-4xl">
          <h3 className="text-lg font-bold my-2">
            {isEdit ? 'Chỉnh sửa thông tin' : 'Tạo loại tin mới'}
          </h3>
          <div className="py-4">
            <form onSubmit={handleSubmit(handleCreatePostType)}>
              <FormGroup>
                <Label>Tên loại tin</Label>
                <Input
                  control={control}
                  error={errors.title?.message}
                  placeholder={'VD: Tin VIP'}
                  name={'title'}
                ></Input>
              </FormGroup>
              <div className="md:flex items-center md:space-x-5">
                <div className="md:w-1/3">
                  <FormGroup>
                    <Label>Giá theo ngày</Label>
                    <Input
                      control={control}
                      error={errors.priceForDay?.message}
                      placeholder={'4.000.000'}
                      name={'priceForDay'}
                    ></Input>
                  </FormGroup>
                </div>
                <div className="md:w-1/3">
                  <FormGroup>
                    <Label>Giá theo tuần</Label>
                    <Input
                      control={control}
                      error={errors.priceForWeek?.message}
                      placeholder={'4.000.000'}
                      name={'priceForWeek'}
                    ></Input>
                  </FormGroup>
                </div>
                <div className="md:w-1/3">
                  <FormGroup>
                    <Label>Giá theo tháng</Label>
                    <Input
                      control={control}
                      error={errors.priceForMonth?.message}
                      placeholder={'4.000.000'}
                      name={'priceForMonth'}
                    ></Input>
                  </FormGroup>
                </div>
              </div>
              <FormGroup>
                <Label>Mô tả</Label>
                <TextArea
                  control={control}
                  name={'description'}
                  error={errors.description?.message}
                ></TextArea>
              </FormGroup>
              <FormGroup>
                <Label>Tính năng</Label>
                <TextArea
                  control={control}
                  name={'features'}
                  error={errors.features?.message}
                ></TextArea>
              </FormGroup>
              <div className="flex items-center justify-end space-x-2">
                <label htmlFor={id} ref={modalCreatePostTypeRef} className={'cursor-pointer'}>
                  Hủy bỏ
                </label>
                {isEdit ? (
                  <ButtonPrimary title="Cập nhật" type="submit" className="w-[150px] float-right" />
                ) : (
                  <ButtonPrimary
                    title="Tạo loại tin"
                    type="submit"
                    className="w-[150px] float-right"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </label>
    </div>
  )
}

ModalCreatePostType.propTypes = {
  id: PropTypes.string,
}
export default ModalCreatePostType
