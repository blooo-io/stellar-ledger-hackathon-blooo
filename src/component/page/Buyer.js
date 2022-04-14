import React, { Fragment, useState } from 'react'
import QrCode from './QrCode'


const publicKey="GBXVND3EA436LZZVVXX7AKVAF42664L5IKIAKDVFIVFEZUCICEONVWLJ"


const Buyer = () => {
  const [displayQr, setDisplayQr] = useState(false)

  
  return (
    <Fragment>
      {displayQr && <QrCode publicKey={publicKey}></QrCode>}
      {!displayQr &&
        <Fragment>
          <div>Buyer</div>
          <button onClick={() => setDisplayQr(true)}>Generate QR</button>
        </Fragment>
      }
    </Fragment>
  )
}

export default Buyer