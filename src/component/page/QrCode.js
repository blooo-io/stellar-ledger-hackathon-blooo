import React from 'react'
import {QRCodeSVG} from 'qrcode.react';

const QrCode = ({publicKey}) => {
    return (
        <div>
            <QRCodeSVG value={publicKey} size="300" bgColor="#FFFFFF" fgColor="#92C14B" level="Q"/>
        </div>
    )
}

export default QrCode