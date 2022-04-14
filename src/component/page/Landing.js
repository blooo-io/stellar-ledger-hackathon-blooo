import React, { useState } from "react";
import {QRCodeSVG} from 'qrcode.react';
import { QrReader } from 'react-qr-reader';


const publicKey="GBXVND3EA436LZZVVXX7AKVAF42664L5IKIAKDVFIVFEZUCICEONVWLJ"
const [data, setData] = useState('No result');

const Landing = () => {
  return (
    <div>
      <div>My ID</div>
      <br></br>
      <div><QRCodeSVG value={publicKey} size="300" bgColor="#FFFFFF" fgColor="#92C14B" level="Q"/></div>

      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <p>{data}</p>

    </div>

  )
}

export default Landing