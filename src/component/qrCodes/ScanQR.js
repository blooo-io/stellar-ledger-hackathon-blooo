import React, { Fragment, useState, useEffect } from 'react'
import {QRCodeSVG} from 'qrcode.react';
import { QrReader } from 'react-qr-reader';

const ScanQR = ({className}) => {

  const [data, setData] = useState('No result');
  
  
  useEffect(() => {
   
  }, [data])

  return (
    <div
        style={{
            margin: 'auto',
            width: '400px'
        }}
    >
    <QrReader
      className={className}
      ViewFinder={function noRefCheck(){}}
      constraints={{
        facingMode: 'user'
      }}
      onResult={(result, error) => {
        if (!!result) {
          setData(result?.text);
        }
        if (!!error) {
          console.info(error);
        }
      }
    }
    />
    <p>{data}</p>
  </div>
  )
}

export default ScanQR