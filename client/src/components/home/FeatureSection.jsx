import React, { useEffect, useState } from 'react'
import fast from '@/assets/images/features/fast.png'
import safe from '@/assets/images/features/safe.png'
import friends from '@/assets/images/features/friends.png'
import room from '@/assets/images/features/room.png'
import diversity from '@/assets/images/features/diversity.png'
import easy from '@/assets/images/features/easy.png'
import FilterPopup from '../filter/FilterPopup'
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import { useRouter } from 'next/router'
import {
  categoryConfig,
  districtsConfig,
  furnitueConfig,
  hasVideoConfig,
  provincesConfig,
  tradingFormConfig,
  wardsConfig,
} from 'configs/configs'
import { addressAPI } from 'apis/address'
import dynamic from 'next/dynamic'
import RadioWithoutValidate from '../input/RadioWithoutValidate'
import FilterButton from '../filter/FilterButton'
import { formatPrice } from 'utils/common'
const Select = dynamic(() => import('react-select'), { ssr: false })
const features = [
  { id: 1, img: room, des: 'Tìm phòng siêu nhanh' },
  { id: 2, img: diversity, des: 'Dịch vụ đa dạng' },
  { id: 3, img: friends, des: 'Kết nối bạn cùng phòng' },
  { id: 4, img: safe, des: 'Uy tín, chính xác' },
  { id: 5, img: fast, des: 'Đăng bài nhanh chóng' },
  { id: 6, img: easy, des: 'Thao tác dễ dàng' },
]
export default function FeatureSection() {
  const router = useRouter()
  const [filterUrl, setFilterUrl] = useState('')
  const [priceRange, setPriceRange] = useState([500000, 50000000])
  const [areaRange, setAreaRange] = useState([10, 100])

  const [category, setCategory] = useState(categoryConfig)

  const [provinceOption, setProvinceOption] = useState([])
  const [districtOption, setDistrictOption] = useState([])
  const [wardOption, setWardOption] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedWard, setSelectedWard] = useState(null)
  const [tradingForm, setTradingForm] = useState(null)
  const [furniture, setFurniture] = useState(null)
  const [hasVideo, setHasVideo] = useState(null)

  const [priceRangeUrl, setPriceRangeUrl] = useState('')
  const [areaRangeUrl, setAreaRangeUrl] = useState('')
  const [addressUrl, setAddressUrl] = useState('')
  const [categoryUrl, setCategoryUrl] = useState('')
  const [tradingFormUrl, setTradingFormUrl] = useState('')
  const [furnitureUrl, setFurnitureUrl] = useState('')
  const [hasVideoUrl, setHasVideoUrl] = useState('')
  const [keyword, setKeyword] = useState('')

  const onChanegInputSearch = (e) => {
    setKeyword(e.target.value)
  }

  const handleApplySearch = (e) => {
    e.preventDefault()
    if ('keyword' in router.query) {
      delete router.query.keyword
    }

    if (!Object.keys(router.query).length && keyword) {
      router.push(`/filter?keyword=${keyword}`)
    } else if (keyword) {
      handleGetFilterUrl(`keyword=${keyword}`)
    } else {
      handleGetFilterUrl()
    }
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

  const handleChangePriceRange = (value) => {
    setPriceRange(value)
  }

  const handleChangeAreaRange = (value) => {
    setAreaRange(value)
  }

  const handleSelectTradingForm = (e) => {
    console.log(e.target.value == tradingFormConfig['BUY_SELL'])
    setTradingForm(e.target.value)
  }

  const handleSelectFurniture = (e) => {
    setFurniture(e.target.value)
  }

  const handleSelectHasVideo = (e) => {
    setHasVideo(e.target.value)
  }

  const handleApplyTradingForm = () => {
    if ('tradingForm' in router.query) {
      delete router.query.tradingForm
    }
    setTradingFormUrl(`tradingForm=${tradingForm}`)
    if (!filterUrl) {
      setFilterUrl(`tradingForm=${tradingForm}`)
    }
  }

  const handleApplyFurniture = () => {
    if ('isFurniture' in router.query) {
      delete router.query.isFurniture
    }
    setFurnitureUrl(`isFurniture=${furniture}`)
    if (!filterUrl) {
      setFilterUrl(`isFurniture=${furniture}`)
    }
  }

  const handleApplyHasVideo = () => {
    if ('hasVideo' in router.query) {
      delete router.query.hasVideo
    }
    setHasVideoUrl(`hasVideo=${hasVideo}`)
    if (!filterUrl) {
      setFilterUrl(`hasVideo=${hasVideo}`)
    }
  }

  const handleApply = () => {
    if ('category' in router.query) {
      delete router.query.category
    }

    setCategoryUrl(
      `category=${category
        .filter((item) => item.isChecked)
        .map((i) => i.id)
        .join(',')}`
    )
    if (!filterUrl) {
      setFilterUrl(
        `category=${category
          .filter((item) => item.isChecked)
          .map((i) => i.id)
          .join(',')}`
      )
    }
  }

  const handleApplyPriceRange = () => {
    if ('priceRange' in router.query) {
      delete router.query.priceRange
    }
    setPriceRangeUrl(`priceRange=${priceRange[0]},${priceRange[1]}`)
    if (!filterUrl) {
      setFilterUrl(`priceRange=${priceRange[0]},${priceRange[1]}`)
    }
  }

  const handleApplyAreaRange = () => {
    if ('areaRange' in router.query) {
      delete router.query.areaRange
    }
    setAreaRangeUrl(`areaRange=${areaRange[0]},${areaRange[1]}`)
    if (!filterUrl) {
      setFilterUrl(`areaRange=${areaRange[0]},${areaRange[1]}`)
    }
  }

  const handleApplyAddress = () => {
    if ('address' in router.query) {
      delete router.query.address
    }
    setAddressUrl(
      `address=${selectedProvince.value}${
        selectedDistrict?.value ? ',' + selectedDistrict.value : ''
      }${selectedWard?.value ? ',' + selectedWard.value : ''}`
    )
    if (!filterUrl) {
      setFilterUrl(
        `address=${selectedProvince.value}${
          selectedDistrict?.value ? ',' + selectedDistrict.value : ''
        }${selectedWard?.value ? ',' + selectedWard.value : ''}`
      )
    }
  }

  const handleGetFilterUrl = (value) => {
    if (Object.keys(router.query).length) {
      let queryTemp = []
      for (const key in router.query) {
        queryTemp.push(`${key}=${router.query[key]}`)
      }
      if (value) {
        router.push(`/filter?${queryTemp.join('&')}&${value}`)
      } else {
        router.push(`/filter?${queryTemp.join('&')}`)
      }
    } else {
      router.push(`/filter?${filterUrl}`)
    }
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

  useEffect(() => {
    if (priceRangeUrl || filterUrl) {
      handleGetFilterUrl(priceRangeUrl)
    }
  }, [priceRangeUrl, filterUrl])

  useEffect(() => {
    if (areaRangeUrl) {
      handleGetFilterUrl(areaRangeUrl)
    }
  }, [areaRangeUrl])

  useEffect(() => {
    if (categoryUrl) {
      handleGetFilterUrl(categoryUrl)
    }
  }, [categoryUrl])

  useEffect(() => {
    if (addressUrl) {
      handleGetFilterUrl(addressUrl)
    }
  }, [addressUrl])

  useEffect(() => {
    if (tradingFormUrl) {
      handleGetFilterUrl(tradingFormUrl)
    }
  }, [tradingFormUrl])

  useEffect(() => {
    if (furnitureUrl) {
      handleGetFilterUrl(furnitureUrl)
    }
  }, [furnitureUrl])

  useEffect(() => {
    if (hasVideoUrl) {
      handleGetFilterUrl(hasVideoUrl)
    }
  }, [hasVideoUrl])

  useEffect(() => {
    if (Object.keys(router.query).length) {
      const {
        category: cate,
        priceRange: priceRangeUrl,
        areaRange: areaRangeUrl,
        address,
        tradingForm: tradingFormUrl,
        keyword,
      } = router.query
      if (keyword) {
        setKeyword(keyword)
      }
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
        setPriceRange([priceRangeUrl[0], priceRangeUrl[1]])
      }
      if (areaRangeUrl) {
        setAreaRange([areaRangeUrl[0], areaRangeUrl[1]])
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
    }
  }, [router.query])

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
  return (
    <div className="bg-base-100 md:py-8 pt-8 pb-4">
      <div className="container mx-auto padding-mobile">
        <form onSubmit={(e) => handleApplySearch(e)}>
          <div className="mb-4 relative">
            <i className="fa-regular fa-magnifying-glass absolute top-1/2 -translate-y-2/4 left-3 z-10 text-gray-400 text-sm"></i>
            <input
              placeholder="Bất động sản bạn đang tìm kiếm?"
              onChange={(e) => onChanegInputSearch(e)}
              value={keyword}
              className="text-primary w-full py-3 pl-[36px] rounded-lg outline-none focus:border-2 focus:border-primary border border-gray-300 bg-base-100"
            />
          </div>
        </form>
        <FilterButton />
        <div className="hidden lg:flex items-center space-x-5 justify-center py-4">
          <FilterPopup
            label={'tradingForm'}
            title={'Hình thức'}
            handleApply={handleApplyTradingForm}
          >
            <div className="p-4">
              <div className="text-black">
                <span className="font-bold text-black">Hình thức cho thuê</span>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-4">
                    <RadioWithoutValidate
                      checked={tradingForm == tradingFormConfig['BUY_SELL']}
                      name={'tradingForm'}
                      id={'kindRadio'}
                      value={tradingFormConfig['BUY_SELL']}
                      onChange={(e) => handleSelectTradingForm(e)}
                    />
                    <label className="flex-1 cursor-pointer" htmlFor={'kindRadio'}>
                      Bán
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioWithoutValidate
                      checked={tradingForm == tradingFormConfig['FOR_RENTAL']}
                      name={'tradingForm'}
                      id={'kindRadio'}
                      value={tradingFormConfig['FOR_RENTAL']}
                      onChange={(e) => handleSelectTradingForm(e)}
                    />
                    <label className="flex-1 cursor-pointer" htmlFor={'kindRadio'}>
                      Cho thuê
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioWithoutValidate
                      checked={tradingForm == tradingFormConfig['RENTAL']}
                      name={'tradingForm'}
                      id={'kindRadio13'}
                      value={tradingFormConfig['RENTAL']}
                      onChange={(e) => handleSelectTradingForm(e)}
                    />
                    <label className="flex-1 cursor-pointer" htmlFor={'kindRadio13'}>
                      Cần thuê
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioWithoutValidate
                      checked={tradingForm == tradingFormConfig['ROOM_MATE']}
                      name={'tradingForm'}
                      id={'kindRadio'}
                      value={tradingFormConfig['ROOM_MATE']}
                      onChange={(e) => handleSelectTradingForm(e)}
                    />
                    <label className="flex-1 cursor-pointer" htmlFor={'kindRadio'}>
                      Tìm bạn ở ghép
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </FilterPopup>
          <FilterPopup label={'address'} title={'Vị trí'} handleApply={handleApplyAddress}>
            <div className="text-black p-4">
              <span className="font-bold">Vị trí</span>
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
            </div>
          </FilterPopup>
          <FilterPopup label={'category'} handleApply={handleApply} title={'Loại bất động sản'}>
            <div className="p-4">
              <div className="text-black">
                <span className="font-bold">Loại bất động sản</span>
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
              </div>
            </div>
          </FilterPopup>
          <FilterPopup
            title={'Khoảng giá'}
            handleApply={handleApplyPriceRange}
            label={'priceRange'}
          >
            <div className="p-4 text-black">
              <span className="font-bold">Khoảng giá</span>
              <div className="py-2">
                <RangeSlider
                  onInput={handleChangePriceRange}
                  min={500000}
                  max={100000000}
                  step={1}
                  value={priceRange}
                />
              </div>
              <div className="py-2 flex items-center justify-between">
                <input
                  type={'text'}
                  value={formatPrice(priceRange[0]) + ' đ'}
                  className={'border border-gray-200 p-2 rounded-lg w-[140px]'}
                  disabled
                />
                <span>-</span>
                <input
                  type={'text'}
                  value={formatPrice(priceRange[1]) + ' đ'}
                  className={'border border-gray-200 p-2 rounded-lg w-[140px]'}
                  disabled
                />
              </div>
            </div>
          </FilterPopup>
          <FilterPopup title={'Diện tích'} handleApply={handleApplyAreaRange} label={'areaRange'}>
            <div className="p-4 text-black">
              <span className="font-bold">Diện tích</span>
              <div className="py-2">
                <RangeSlider
                  onInput={handleChangeAreaRange}
                  min={10}
                  max={1000}
                  step={1}
                  value={areaRange}
                />
              </div>
              <div className="py-2 flex items-center justify-between">
                <input
                  type={'number'}
                  value={areaRange[0]}
                  className={'border border-gray-200 p-2 rounded-lg w-[140px]'}
                  disabled
                />
                <span>-</span>
                <input
                  type={'number'}
                  value={areaRange[1]}
                  className={'border border-gray-200 p-2 rounded-lg w-[140px]'}
                  disabled
                />
              </div>
            </div>
          </FilterPopup>
          <FilterPopup label={'isFurniture'} title={'Nội thất'} handleApply={handleApplyFurniture}>
            <div className="p-4">
              <div className="text-black">
                <span className="font-bold text-black">Tình trạng nội thất</span>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-4">
                    <RadioWithoutValidate
                      checked={furniture == furnitueConfig['NONE']}
                      name={'furniture'}
                      id={'kindRadio11'}
                      value={furnitueConfig['NONE']}
                      onChange={(e) => handleSelectFurniture(e)}
                    />
                    <label className="flex-1 cursor-pointer" htmlFor={'kindRadio11'}>
                      Không có
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioWithoutValidate
                      checked={furniture == furnitueConfig['BASIC']}
                      name={'furniture'}
                      id={'kindRadio11'}
                      value={furnitueConfig['BASIC']}
                      onChange={(e) => handleSelectFurniture(e)}
                    />
                    <label className="flex-1 cursor-pointer" htmlFor={'kindRadio11'}>
                      Cơ bản
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioWithoutValidate
                      checked={furniture == furnitueConfig['FULL']}
                      name={'furniture'}
                      id={'kindRadio11'}
                      value={furnitueConfig['FULL']}
                      onChange={(e) => handleSelectFurniture(e)}
                    />
                    <label className="flex-1 cursor-pointer" htmlFor={'kindRadio11'}>
                      Đầy đủ
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </FilterPopup>
          <FilterPopup title={'Tin có video'} label={'hasVideo'} handleApply={handleApplyHasVideo}>
            <div className="p-4">
              <div className="text-black">
                <span className="font-bold text-black">Tin đăng có video</span>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-4">
                    <RadioWithoutValidate
                      checked={hasVideo == hasVideoConfig['NONE']}
                      name={'hasVideo'}
                      id={'kindRadio10'}
                      value={hasVideoConfig['NONE']}
                      onChange={(e) => handleSelectHasVideo(e)}
                    />
                    <label className="flex-1 cursor-pointer" htmlFor={'kindRadio10'}>
                      Không video
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioWithoutValidate
                      checked={hasVideo == hasVideoConfig['HAS_VIDEO']}
                      name={'hasVideo'}
                      id={'kindRadio10'}
                      value={hasVideoConfig['HAS_VIDEO']}
                      onChange={(e) => handleSelectHasVideo(e)}
                    />
                    <label className="flex-1 cursor-pointer" htmlFor={'kindRadio10'}>
                      Có video
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RadioWithoutValidate
                      checked={hasVideo == hasVideoConfig['ALL']}
                      name={'hasVideo'}
                      id={'kindRadio10'}
                      value={hasVideoConfig['ALL']}
                      onChange={(e) => handleSelectHasVideo(e)}
                    />
                    <label className="flex-1 cursor-pointer" htmlFor={'kindRadio10'}>
                      Tất cả
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </FilterPopup>

          {/* <div className="px-4 py-2 border border-gray rounded-lg font-semibold text-primary">
            ... Thêm tiêu chí
          </div> */}
        </div>
      </div>
    </div>
  )
}
