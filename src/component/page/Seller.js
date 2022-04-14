import React, { Fragment, useState } from 'react'
import QrCode from './QrCode'

const publicKey="GAAR5R4PL4ON7HT6PJFUDTB4VZX2ML7XLE42TUFRIGW72VMJQX2EK4CZ"


const Seller = () => {
  const [displayQr, setDisplayQr] = useState(false)

  
  return (
    <Fragment>
      {displayQr && <QrCode publicKey={publicKey}></QrCode>}
      {!displayQr &&
        <Fragment>
          <div>Seller</div>
          <button onClick={() => setDisplayQr(true)}>Generate QR</button>
        </Fragment>
      }
    </Fragment>
  )
}

export default Seller