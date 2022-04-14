import React from 'react'
import {QRCodeSVG} from 'qrcode.react';

const publicKey="GBXVND3EA436LZZVVXX7AKVAF42664L5IKIAKDVFIVFEZUCICEONVWLJ"

const Landing = () => {
  return (
    <div>
      <div>My ID</div>
      <br></br>
      <div><QRCodeSVG value={publicKey} size="300" bgColor="#FFFFFF" fgColor="#92C14B" level="Q"/></div>
    </div>

  )
}

export default Landing