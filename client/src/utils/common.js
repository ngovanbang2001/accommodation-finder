import slugify from 'slugify'
import { formatDate } from './moment'

export const checkPhone = (phone) => {
  return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(phone)
}

export const checkEmail = (email) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

export const formatPrice = (price) => {
  if (price && price >= 0) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
}

export const strToSlug = (str) => {
  return slugify(str, '-')
}

export const generateSpecificAdress = (houseNumber, lane, street, ward, district, province) => {
  return `${houseNumber ? houseNumber + ', ' : ''}${lane ? lane + ', ' : ''}${
    street ? street + ', ' : ''
  }${ward}, ${district}, ${province}.`
}

export const generateDate = (date) => {
  const dateFormatArray = formatDate(date).split('/')
  if (dateFormatArray[1].charAt(0) === '0') {
    return `tháng ${dateFormatArray[1].charAt(1)} năm ${dateFormatArray[2]}`
  }
  return `tháng ${dateFormatArray[1]} năm ${dateFormatArray[2]}`
}

export const formatPhoneNumerDisplay = (phoneNumber) => {
  let phoneNumberDisplay = ''
  for (let i = 0; i < phoneNumber.length; i++) {
    if (i > 2 && i <= 7) {
      phoneNumberDisplay += '*'
    } else {
      phoneNumberDisplay += phoneNumber[i]
    }
  }
  return phoneNumberDisplay
}

export const getTradingForm = (tradingForm) => {
  switch (tradingForm) {
    case 1: {
      return `Cho thuê`
    }
    case 2: {
      return `Bán`
    }
    case 3: {
      return `Cần thuê`
    }
    case 4: {
      return `Tìm bạn ở ghép`
    }
  }
}
