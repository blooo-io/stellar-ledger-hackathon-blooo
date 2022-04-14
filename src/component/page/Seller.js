import React, { Fragment } from 'react'

const Seller = () => {

  const scanQR = () => {
    //
  }
  return (
    <Fragment>
      <div>Seller</div>
      <button onClick={scanQR()}>Scan QR</button>
    </Fragment>
  )
}

export default Seller