import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import HeaderPopupFilter from './HeaderPopupFilter'
import Collapse from '../common/Collapse'
import Select from 'react-select'
import RadioWithoutValidate from '../input/RadioWithoutValidate'
import {
  categoryConfig,
  districtsConfig,
  furnitueConfig,
  hasVideoConfig,
  provincesConfig,
  tradingFormConfig,
  wardsConfig,
} from 'configs/configs'
import ButtonPrimary from '../button/ButtonPrimary'
import { addressAPI } from 'apis/address'
import { useRouter } from 'next/router'
const FilterPopup = ({ show, setShow }) => {
  const router = useRouter()
  const [filterUrl, setFilterUrl] = useState('')
  const [provinceOption, setProvinceOption] = useState([])
  const [districtOption, setDistrictOption] = useState([])
  const [wardOption, setWardOption] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedWard, setSelectedWard] = useState(null)
  const [tradingForm, setTradingForm] = useState(null)
  const [furniture, setFurniture] = useState(null)
  const [hasVideo, setHasVideo] = useState(null)
  const [category, setCategory] = useState(categoryConfig)
  const [priceRange, setPriceRange] = useState({
    min: 10000,
    max: 10000000,
  })
  const [areaRange, setAreaRange] = useState({
    min: 5,
    max: 100,
  })

  useEffect(() => {
    ;(async () => {
      const res = await addressAPI.getProvinces()
      if (res) {
        const temp = res.map((item) => ({
          value: item.id,
          label: item.fullName,
        }))
        setProvinceOption([...temp])
      }
    })()
  }, [])
  useEffect(() => {
    ;(async () => {
      if (selectedProvince?.label) {
        const res = await addressAPI.getDistricts(selectedProvince.value)
        if (res) {
          const temp = res.map((item) => ({
            value: item.id,
            label: item.fullName,
          }))
          setDistrictOption([...temp])
        }
      }
    })()
  }, [selectedProvince])

  useEffect(() => {
    ;(async () => {
      if (selectedDistrict?.label) {
        const res = await addressAPI.getWards(selectedDistrict.value)
        if (res) {
          const temp = res.map((item) => ({
            value: item.id,
            label: item.fullName,
          }))
          setWardOption([...temp])
        }
      }
    })()
  }, [selectedDistrict])

  useEffect(() => {
    if (Object.keys(router.query).length) {
      const {
        category: cate,
        priceRange: priceRangeUrl,
        areaRange: areaRangeUrl,
        address,
        tradingForm: tradingFormUrl,
        isFurnitue: furnitureUrl,
        hasVideo: hasVideoUrl,
      } = router.query

      if (cate) {
        let categoryArray = category.map((item) => {
          if (cate.split(',').includes(item.id.toString())) {
            return {
              ...item,
              isChecked: true,
            }
          }
          return item
        })
        setCategory([...categoryArray])
      }
      if (priceRangeUrl) {
        const priceTemp = priceRangeUrl.split(',')
        setPriceRange({ min: priceTemp[0], max: priceTemp[1] })
      }
      if (areaRangeUrl) {
        const areaTemp = areaRangeUrl.split(',')
        setAreaRange({ min: areaTemp[0], max: areaTemp[1] })
      }
      if (address) {
        const addressTemp = address.split(',')
        if (addressTemp[0]) {
          setSelectedProvince({
            value: addressTemp[0],
            label: provincesConfig[addressTemp[0]],
          })
        }
        if (addressTemp[1]) {
          setSelectedDistrict({
            value: addressTemp[1],
            label: districtsConfig[addressTemp[1]],
          })
        }
        if (addressTemp[2]) {
          setSelectedWard({
            value: addressTemp[2],
            label: wardsConfig[addressTemp[2]],
          })
        }
      }
      if (tradingFormUrl) {
        setTradingForm(tradingFormUrl)
      }
      if (furnitureUrl) {
        setFurniture(furnitureUrl)
      }
      if (hasVideoUrl) {
        setHasVideo(hasVideoUrl)
      }
    }
  }, [router.query])

  const handleSelectTradingForm = (e) => {
    setTradingForm(e.target.value)
  }

  const handleSelectFurniture = (e) => {
    setFurniture(e.target.value)
  }

  const handleSelectHasVideo = (e) => {
    setHasVideo(e.target.value)
  }

  const handleSelectProvince = (option) => {
    setSelectedProvince(option)
    setSelectedDistrict(null)
    setSelectedWard(null)
  }

  const handleSelectDistrict = (option) => {
    setSelectedDistrict(option)
    setSelectedWard(null)
  }

  const handleSelectWard = (option) => {
    setSelectedWard(option)
  }

  const handleChangePriceRange = (value) => {
    setPriceRange(value)
  }

  const handleChangeAreaRange = (value) => {
    setAreaRange(value)
  }

  const selectCategory = (id) => {
    const temp = category.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked,
        }
      }
      return item
    })
    setCategory([...temp])
  }

  const handleApply = () => {
    let filterParams = {}
    if ('tradingForm' in router.query) {
      delete router.query.tradingForm
    }
    if ('isFurnitue' in router.query) {
      delete router.query.isFurnitue
    }
    if ('hasVideo' in router.query) {
      delete router.query.hasVideo
    }
    if ('address' in router.query) {
      delete router.query.address
    }
    if ('category' in router.query) {
      delete router.query.category
    }
    if ('priceRange' in router.query) {
      delete router.query.priceRange
    }

    if ('areaRange' in router.query) {
      delete router.query.areaRange
    }
    filterParams.tradingForm = tradingForm
    filterParams.isFurnitue = furniture
    filterParams.hasVideo = hasVideo
    filterParams.address = selectedProvince?.value
      ? `${selectedProvince.value}${selectedDistrict?.value ? ',' + selectedDistrict?.value : ''}${
          selectedWard?.value ? ',' + selectedWard.value : ''
        }`
      : null
    filterParams.category = `${category
      .filter((item) => item.isChecked)
      .map((i) => i.id)
      .join(',')}`
    filterParams.priceRange = `${priceRange.min},${priceRange.max}`
    filterParams.areaRange = `${areaRange.min},${areaRange.max}`

    const q = Object.fromEntries(Object.entries(filterParams).filter(([_, v]) => v))
    let queryTemp = []
    for (const key in q) {
      queryTemp.push(`${key}=${q[key]}`)
    }
    setShow(false)
    router.push(`/filter?${queryTemp.join('&')}`)
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 w-full h-screen bg-base-100 transition-all duration-300 z-30 ${
        show ? '' : 'translate-y-full'
      }`}
    >
      <HeaderPopupFilter setShow={setShow} />
      <div className={'flex flex-col space-y-5 px-2 overflow-y-auto h-full pb-32'}>
        <Collapse title={'Hình thức'}>
          <div className="flex items-center space-x-2 justify-evenly">
            <div className="flex items-center space-x-2">
              <RadioWithoutValidate
                checked={tradingForm == tradingFormConfig['BUY_SELL']}
                name={'tradingForm'}
                id={'kindRadio1'}
                value={tradingFormConfig['BUY_SELL']}
                onChange={(e) => handleSelectTradingForm(e)}
              />
              <label className="flex-1 cursor-pointer" htmlFor={'kindRadio1'}>
                Bán
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioWithoutValidate
                checked={tradingForm == tradingFormConfig['FOR_RENTAL']}
                name={'tradingForm'}
                id={'kindRadio1'}
                value={tradingFormConfig['FOR_RENTAL']}
                onChange={(e) => handleSelectTradingForm(e)}
              />
              <label className="flex-1 cursor-pointer" htmlFor={'kindRadio1'}>
                Cho thuê
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioWithoutValidate
                checked={tradingForm == tradingFormConfig['RENTAL']}
                name={'tradingForm'}
                id={'kindRadio1'}
                value={tradingFormConfig['RENTAL']}
                onChange={(e) => handleSelectTradingForm(e)}
              />
              <label className="flex-1 cursor-pointer" htmlFor={'kindRadio1'}>
                Cần thuê
              </label>
            </div>
          </div>
          <div className="flex items-center space-x-10 justify-evenly mt-4">
            <div className="flex items-center space-x-2">
              <RadioWithoutValidate
                checked={tradingForm == tradingFormConfig['ROOM_MATE']}
                name={'tradingForm'}
                id={'kindRadio1'}
                value={tradingFormConfig['ROOM_MATE']}
                onChange={(e) => handleSelectTradingForm(e)}
              />
              <label className="flex-1 cursor-pointer" htmlFor={'kindRadio1'}>
                Tìm bạn ở ghép
              </label>
            </div>
          </div>
        </Collapse>
        <Collapse title={'Vị trí'}>
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderRadius: '8px',
                borderColor: '#e5e7eb',
                margin: '8px 0',
              }),
            }}
            options={provinceOption}
            onChange={(option) => {
              handleSelectProvince(option)
            }}
            isSearchable
            value={selectedProvince}
            placeholder={'Chọn Tỉnh/Thành phố'}
          />
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderRadius: '8px',
                borderColor: '#e5e7eb',
                margin: '8px 0',
              }),
            }}
            options={districtOption}
            onChange={(option) => {
              handleSelectDistrict(option)
            }}
            isSearchable
            value={selectedDistrict}
            placeholder={'Chọn Quận/Huyện'}
          />
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderRadius: '8px',
                borderColor: '#e5e7eb',
                margin: '8px 0',
              }),
            }}
            options={wardOption}
            onChange={(option) => {
              handleSelectWard(option)
            }}
            isSearchable
            value={selectedWard}
            placeholder={'Chọn Phường/Xã'}
          />
        </Collapse>
        <Collapse title={'Loại bất động sản'}>
          <div>
            {category.map((item) => (
              <div className="flex items-center space-x-2 py-1" key={item.id}>
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => selectCategory(item.id)}
                  className="checkbox checkbox-primary"
                />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </Collapse>
        <Collapse title={'Khoảng giá'}>
          <div className="pb-4">
            <input
              type="range"
              onChange={handleChangePriceRange}
              min={1000000}
              max={1000000000}
              step={1}
              value={priceRange}
            />
          </div>
        </Collapse>
        <Collapse title={'Diện tích'}>
          <div className="pb-4">
            <input
              type="range"
              onChange={handleChangeAreaRange}
              min={10}
              max={500}
              step={1}
              value={areaRange}
            />
          </div>
        </Collapse>
        <Collapse title={'Nội thất'}>
          <div className="p-2">
            <div className="text-black">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-4">
                  <RadioWithoutValidate
                    checked={furniture == furnitueConfig['NONE']}
                    name={'furniture'}
                    id={'kindRadio2'}
                    value={furnitueConfig['NONE']}
                    onChange={(e) => handleSelectFurniture(e)}
                  />
                  <label className="flex-1 cursor-pointer" htmlFor={'kindRadio2'}>
                    Không có
                  </label>
                </div>
                <div className="flex items-center space-x-4">
                  <RadioWithoutValidate
                    checked={furniture == furnitueConfig['BASIC']}
                    name={'furniture'}
                    id={'kindRadio2'}
                    value={furnitueConfig['BASIC']}
                    onChange={(e) => handleSelectFurniture(e)}
                  />
                  <label className="flex-1 cursor-pointer" htmlFor={'kindRadio2'}>
                    Cơ bản
                  </label>
                </div>
                <div className="flex items-center space-x-4">
                  <RadioWithoutValidate
                    checked={furniture == furnitueConfig['FULL']}
                    name={'furniture'}
                    id={'kindRadio2'}
                    value={furnitueConfig['FULL']}
                    onChange={(e) => handleSelectFurniture(e)}
                  />
                  <label className="flex-1 cursor-pointer" htmlFor={'kindRadio2'}>
                    Đầy đủ
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
        <Collapse title={'Tin có video'}>
          <div className="p-2">
            <div className="text-black">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-4">
                  <RadioWithoutValidate
                    checked={hasVideo == hasVideoConfig['NONE']}
                    name={'hasVideo'}
                    id={'kindRadio3'}
                    value={hasVideoConfig['NONE']}
                    onChange={(e) => handleSelectHasVideo(e)}
                  />
                  <label className="flex-1 cursor-pointer" htmlFor={'kindRadio3'}>
                    Không video
                  </label>
                </div>
                <div className="flex items-center space-x-4">
                  <RadioWithoutValidate
                    checked={hasVideo == hasVideoConfig['HAS_VIDEO']}
                    name={'hasVideo'}
                    id={'kindRadio3'}
                    value={hasVideoConfig['HAS_VIDEO']}
                    onChange={(e) => handleSelectHasVideo(e)}
                  />
                  <label className="flex-1 cursor-pointer" htmlFor={'kindRadio3'}>
                    Có video
                  </label>
                </div>
                <div className="flex items-center space-x-4">
                  <RadioWithoutValidate
                    checked={hasVideo == hasVideoConfig['ALL']}
                    name={'hasVideo'}
                    id={'kindRadio3'}
                    value={hasVideoConfig['ALL']}
                    onChange={(e) => handleSelectHasVideo(e)}
                  />
                  <label className="flex-1 cursor-pointer" htmlFor={'kindRadio3'}>
                    Tất cả
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
      <div className="bg-base-100 fixed bottom-0 pb-5 left-1/2 -translate-x-2/4 w-full flex items-center space-x-3 px-2">
        <ButtonPrimary title="Áp dụng" className="w-full" handleClick={handleApply} />
        <ButtonPrimary title="Đặt lại" className="w-full" isPrimary={false} />
      </div>
    </div>
  )
}

FilterPopup.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
}

export default FilterPopup
