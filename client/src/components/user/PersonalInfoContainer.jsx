import { tradingConfig } from 'configs/configs'
import * as React from 'react'
import PersonalInfoItem from './PersonalInfoItem'

export default function PersonalInfoContainer({ tradingForm }) {
  return (
    <div className="flex items-center gap-x-3 justify-evenly py-2 bg-base-200 rounded-xl mb-4">
      <PersonalInfoItem label={'Cá nhân'} iconName={'fa-regular fa-circle-user'} />
      <div className="flex flex-col">
        <span className="block">Tin đăng</span>
        <span className="text-sm font-bold text-primary">{tradingConfig[tradingForm]}</span>
      </div>
    </div>
  )
}
