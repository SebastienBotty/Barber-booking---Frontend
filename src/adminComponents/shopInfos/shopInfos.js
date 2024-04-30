import React from 'react'
import ShopSettings from './shopSettings/shopSettings'

import "./shopInfos.css"

function ShopInfos() {
  return (
    <div className='shop-infos'>
        <div className='shop-infos-side'>
            <ShopSettings/>
        </div>    
        <div className='shop-infos-side'>
            <ShopSettings/>
        </div>
    </div>
  )
}

export default ShopInfos