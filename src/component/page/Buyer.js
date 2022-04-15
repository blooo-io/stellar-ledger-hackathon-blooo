import React, { Fragment, useState, useEffect } from 'react'
import {QRCodeSVG} from 'qrcode.react';
import { QrReader } from 'react-qr-reader';
import ScanQR from '../qrCodes/ScanQR'

const publicKey="GBXVND3EA436LZZVVXX7AKVAF42664L5IKIAKDVFIVFEZUCICEONVWLJ"

const Buyer = () => {

  return (
    <ScanQR className="test"></ScanQR>
  )
}

export default Buyer