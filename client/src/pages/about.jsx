import Image from 'next/image'
import logo_no_icon from '@/assets/images/logo_no_icon.png'
import connectIcon from '@/assets/images/about/su-menh.png'

export default function About() {
  return (
    <div className={'max-w-[1000px] mx-auto padding-mobile my-8'}>
      <div className={'grid grid-cols-2 gap-8'}>
        <div className={'relative h-[36px] mr-8 my-auto'}>
          <Image
            src={logo_no_icon}
            alt={'logo without icon'}
            layout={'fill'}
            className={'object-contain'}
          />
        </div>
        <div className="">
          <h1 className="font-bold">Về Trọ Tốt</h1>
          <b>Trọ Tốt</b> là nền tảng kết nối bất động sản số 1 tại Việt Nam dựa trên 3 yếu tố then
          chốt: Công nghệ, Bất động sản và Marketing. Tại đây, TroTot tạo ra sự kết nối giữa những
          người có nhu cầu mua và bán bất động sản, giữa người dùng và các chuyên gia nhằm giúp mọi
          người tìm kiếm, chia sẻ và xây dựng một không gian sống hoàn hảo. Được thành lập từ năm
          2023, TroTot do anh Ngô Văn Bằng phát triển. Vượt qua nhiều startup Việt, TroTot đã trải
          qua 3 lần gọi vốn thành công từ các Quỹ đầu tư lớn đến từ Hàn Quốc, Nhật Bản, Singapore
          gồm: ESP Capital, Pix Vine, Genesia Ventures, Access Ventures và Mynavi Corporation. Với
          giao diện thân thiện, thông tin cập nhật chính xác cùng nhiều tính năng khác biệt, TroTot
          đang từng ngày khẳng định giá trị đối với người dùng và khách hàng. Đặc biệt, đúng như
          slogan “Be your better home”, chúng tôi luôn nỗ lực nhằm giúp mọi người xây dựng được một
          không gian sống lý tưởng, tạo dựng nền tảng vững chắc cho một tương lai tươi sáng hơn.
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="">
          <h1 className="font-bold">SỨ MỆNH</h1>
          <p className="text-lg">
            Kết nối mọi người với các chuyên gia để giúp họ tìm và tạo nên một không gian sống tốt
            hơn.
          </p>
        </div>
        <div className={''}>
          <Image src={connectIcon} />
        </div>
      </div>
    </div>
  )
}
