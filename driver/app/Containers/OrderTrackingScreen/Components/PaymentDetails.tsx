import React from 'react'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '@/Types'

import { PaymentDetails } from '@/Components'

const Payment = () => {
  const indexOfPhaseRide = useSelector(
    (state: RootState) => state.phase.indexOfPhaseRide
  )
  const { bikers } = useSelector(
    (state: RootState) => state.phase.resultFoundBikers
  )
  const price = useSelector((state: RootState) => {
    // if (indexOfPhaseRide === 0) {
    //   return state.rideInfor.price
    // }
    // return state.package.package[indexOfPhaseRide - 1].price
    return bikers[0].price.toString()
  })

  return <PaymentDetails price={price} />
}

export default Payment
