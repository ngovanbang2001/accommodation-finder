if (typeof window !== 'undefined') {
  theme = localStorage.getItem('theme')
}
export const reactTypesConfig = {
  LIKE: 1,
  LOVE: 2,
  CARE: 3,
  HAHA: 4,
  WOW: 5,
  SAD: 6,
  ANGRY: 7,
}

export const menuUser = [
  {
    id: 1,
    title: 'Trang cá nhân',
    icon: 'fa-regular fa-user',
    path: '/profile/me',
  },
  {
    id: 2,
    title: 'Chỉnh sửa thông tin cá nhân',
    icon: 'fa-regular fa-pen-to-square',
    path: '/management/profile',
  },
  {
    id: 3,
    title: 'Quản lý tin đăng',
    icon: 'fa-regular fa-ballot',
    path: '/management/post',
  },
  {
    id: 4,
    title: 'Tin yêu thích',
    icon: 'fa-regular fa-heart',
    path: '/post/favorites',
  },
  {
    id: 5,
    title: 'Nạp tiền vào tài khoản',
    icon: 'fa-duotone fa-money-check',
    path: '/deposit',
  },
  {
    id: 6,
    title: 'Đăng xuất',
    icon: 'fa-regular fa-arrow-right-from-bracket',
    path: '/sign-in',
  },
]

export const menuAdmin = [
  {
    id: 1,
    title: 'Chỉnh sửa thông tin cá nhân',
    icon: 'fa-regular fa-pen-to-square',
    path: '/managements/profile',
  },
  {
    id: 2,
    title: 'Quản lý tin đăng',
    icon: 'fa-regular fa-ballot',
    path: '/managements/post',
  },
  {
    id: 3,
    title: 'Quản lý tài khoản người dùng',
    icon: 'fa-regular fa-users',
    path: '/managements/account',
  },
  {
    id: 4,
    title: 'Cấu hình giá',
    icon: 'fa-regular fa-circle-dollar',
    path: '/managements/price',
  },
  {
    id: 5,
    title: 'Đăng xuất',
    icon: 'fa-regular fa-arrow-right-from-bracket',
    path: '/sign-in',
  },
]

export const menuGuest = [
  {
    id: 1,
    title: 'Đăng ký / Đăng nhập',
    icon: 'fa-regular fa-user',
    path: '/sign-in',
  },
]

export const stayWithHostConfig = {
  1: 'Chung chủ',
  2: 'Không chung chủ',
}

export const privateToiletConfig = {
  1: 'Chung',
  2: 'Khép kín',
}

export const furnitureConfig = {
  1: 'Đầy đủ',
  2: 'Cơ bản',
  3: 'Không có',
}

export const statusConfig = {
  0: 'Chờ duyệt',
  1: 'Đang hiển thị',
  2: 'Đã từ chối',
  3: 'Đã hết hạn',
}

export const activeNewConfig = {
  0: 'Không hiển thị',
  1: 'Đang hiển thị',
}

export const activeAccountConfig = {
  1: 'Bình thường',
  0: 'Tạm khóa',
}

export const activePostTypeConfig = {
  0: 'Bỏ kích hoạt',
  1: 'Kích hoạt',
}

export const roleConfig = {
  USER: 0,
  ADMIN: 1,
}

export const categoryTitleConfig = {
  1: 'Căn hộ/Chung cư',
  2: 'Nhà ở',
  3: 'Văn phòng/Mặt bằng kinh doanh',
  4: 'Phòng trọ',
}

export const LIMIT = 10

export const typePostConfig = {
  1: 'Tin thường',
  2: 'Tin VIP',
  3: 'Tin S-VIP',
}

export const typeApartment = {
  1: 'Chung cư',
  2: 'Tập thể',
}

export const typeHouse = {
  1: 'Nhà mặt tiền',
  2: 'Nhà ngõ, hẻm',
  3: 'Nhà biệt thự',
  4: 'Nhà phố liền kề',
}

export const typeOfApartment = {
  1: 'Chung cư',
  2: 'Penhouse',
  3: 'Căn hộ dịch vụ, mini',
  4: 'Tập thể, cư xá',
}

export const tradingConfig = {
  1: 'Cho thuê',
  2: 'Bán',
  3: 'Cần thuê',
  4: 'Tìm bạn ở ghép',
}

export const categoryConfig = [
  { id: 1, title: 'Căn hộ/Chung cư', isChecked: false },
  { id: 2, title: 'Nhà ở', isChecked: false },
  { id: 3, title: 'Văn phòng/Mặt bằng kinh doanh', isChecked: false },
  { id: 4, title: 'Phòng trọ', isChecked: false },
]

export const typeOffice = {
  1: 'Mặt bằng kinh doanh',
  2: 'Văn phòng',
  3: 'Shophouse',
  4: 'Officetel',
}

export const tradingFormConfig = {
  BUY_SELL: 2,
  FOR_RENTAL: 1,
  RENTAL: 3,
  ROOM_MATE: 4,
}

export const furnitueConfig = {
  NONE: 1,
  BASIC: 2,
  FULL: 3,
}

export const hasVideoConfig = {
  NONE: 1,
  HAS_VIDEO: 2,
  ALL: 3,
}
export const provincesConfig = {
  269: 'Lào Cai',
  268: 'Hưng Yên',
  267: 'Hòa Bình',
  266: 'Sơn La',
  265: 'Điện Biên',
  264: 'Lai Châu',
  263: 'Yên Bái',
  262: 'Bình Định',
  261: 'Ninh Thuận',
  260: 'Phú Yên',
  259: 'Kon Tum',
  258: 'Bình Thuận',
  253: 'Bạc Liêu',
  252: 'Cà Mau',
  250: 'Hậu Giang',
  249: 'Bắc Ninh',
  248: 'Bắc Giang',
  247: 'Lạng Sơn',
  246: 'Cao Bằng',
  245: 'Bắc Kạn',
  244: 'Thái Nguyên',
  243: 'Quảng Nam',
  242: 'Quảng Ngãi',
  241: 'Đắk Nông',
  240: 'Tây Ninh',
  239: 'Bình Phước',
  238: 'Quảng Trị',
  237: 'Quảng Bình',
  236: 'Hà Tĩnh',
  235: 'Nghệ An',
  234: 'Thanh Hóa',
  233: 'Ninh Bình',
  232: 'Hà Nam',
  231: 'Nam Định',
  230: 'Quảng Ninh',
  229: 'Phú Thọ',
  228: 'Tuyên Quang',
  227: 'Hà Giang',
  226: 'Thái Bình',
  225: 'Hải Dương',
  224: 'Hải Phòng',
  223: 'Thừa Thiên - Huế',
  221: 'Vĩnh Phúc',
  220: 'Cần Thơ',
  219: 'Kiên Giang',
  218: 'Sóc Trăng',
  217: 'An Giang',
  216: 'Đồng Tháp',
  215: 'Vĩnh Long',
  214: 'Trà Vinh',
  213: 'Bến Tre',
  212: 'Tiền Giang',
  211: 'Long An',
  210: 'Đắk Lắk',
  209: 'Lâm Đồng',
  208: 'Khánh Hòa',
  207: 'Gia Lai',
  206: 'Bà Rịa - Vũng Tàu',
  205: 'Bình Dương',
  204: 'Đồng Nai',
  203: 'Đà Nẵng',
  202: 'Hồ Chí Minh',
  201: 'Hà Nội',
}

export const districtsConfig = {
  3440: 'Quận Nam Từ Liêm',
  3303: 'Huyện Thường Tín',
  3255: 'Huyện Phú Xuyên',
  2004: 'Huyện Quốc Oai',
  1915: 'Huyện Chương Mỹ',
  1810: 'Huyện Ứng Hòa',
  1809: 'Huyện Thanh Oai',
  1808: 'Huyện Thạch Thất',
  1807: 'Huyện Phúc Thọ',
  1806: 'Huyện Mỹ Đức',
  1805: 'Huyện Hoài Đức',
  1804: 'Huyện Đan Phượng',
  1803: 'Huyện Ba Vì',
  1711: 'Thị xã Sơn Tây',
  1710: 'Huyện Thanh Trì',
  1703: 'Huyện Gia Lâm',
  1583: 'Huyện Sóc Sơn',
  1582: 'Huyện Đông Anh',
  1581: 'Huyện Mê Linh',
  1542: 'Quận Hà Đông',
  1493: 'Quận Thanh Xuân',
  1492: 'Quận Tây Hồ',
  1491: 'Quận Long Biên',
  1490: 'Quận Hoàng Mai',
  1489: 'Quận Hoàn Kiếm',
  1488: 'Quận Hai Bà Trưng',
  1486: 'Quận Đống Đa',
  1485: 'Quận Cầu Giấy',
  1484: 'Quận Ba Đình',
  1482: 'Quận Bắc Từ Liêm',
  3695: 'Thành Phố Thủ Đức',
  2090: 'Huyện Cần Giờ',
  1534: 'Huyện Nhà Bè',
  1533: 'Huyện Bình Chánh',
  1463: 'Quận Thủ Đức',
  1462: 'Quận Bình Thạnh',
  1461: 'Quận Gò Vấp',
  1460: 'Huyện Củ Chi',
  1459: 'Huyện Hóc Môn',
  1458: 'Quận Bình Tân',
  1457: 'Quận Phú Nhuận',
  1456: 'Quận Tân Phú',
  1455: 'Quận Tân Bình',
  1454: 'Quận 12',
  1453: 'Quận 11',
  1452: 'Quận 10',
  1451: 'Quận 9',
  1450: 'Quận 8',
  1449: 'Quận 7',
  1448: 'Quận 6',
  1447: 'Quận 5',
  1446: 'Quận 4',
  1444: 'Quận 3',
  1443: 'Quận 2',
  1442: 'Quận 1',
}

export const wardsConfig = {
  10608: 'Phường Yên Hoà',
  10607: 'Phường Trung Hoà',
  10606: 'Phường Quan Hoa',
  10605: 'Phường Nghĩa Tân',
  10604: 'Phường Nghĩa Đô',
  10603: 'Phường Mai Dịch',
  10602: 'Phường Dịch Vọng Hậu',
  10601: 'Phường Dịch Vọng',
  20110: 'Phường Tân Định',
  20109: 'Phường Phạm Ngũ Lão',
  20107: 'Phường Nguyễn Cư Trinh',
  20106: 'Phường Đa Kao',
  20105: 'Phường Cô Giang',
  20104: 'Phường Cầu Ông Lãnh',
  20103: 'Phường Cầu Kho',
  20102: 'Phường Bến Thành',
  20101: 'Phường Bến Nghé',
}
