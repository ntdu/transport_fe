// import { io, Socket } from 'socket.io-client'
// import { getUniqueId } from 'react-native-device-info'
import { w3cwebsocket as W3CWebSocket } from "websocket";

// // Redux
// import { store } from '@/Containers/App'
// import SocketActions from '@/Redux/SocketRedux'
// import RideInforActions from '@/Redux/RideInforRedux'
// import PhaseActions from '@/Redux/PhaseRedux'
// import AuthActions from '@/Redux/AuthRedux'
// import UserActions from '@/Redux/UserRedux'

// // Constants
// import {
//   FIND_BIKER_NO_RESULTS,
//   RETRY_FIND_BIKER,
//   FOUND_BIKERS_EVENT,
//   GENERIC_ERROR,
//   RONT_RIDEHASH,
//   TOKEN_EXPIRED_ERROR,
//   TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER_ERROR,
//   LOCATION_UPDATE
// } from '@/Constants/SocketEventConstants'

// // Functions
// import { requestUserPermissionAndGetToken } from '@/Functions/FCMFunctions'
// import { mapBikerFoundResultToFrontEnd } from '@/Functions/MapDataToFrontendFunctions'

// let socketIo: Socket
// let isInitSocketIo = false

// const userAgent = getUniqueId()

// export const initSocket = async (accessToken: string) => {
//   const fcmToken = await requestUserPermissionAndGetToken()

//   store.dispatch(UserActions.setUserAgent(userAgent))

//   if (!!fcmToken) {
//     isInitSocketIo = true
//     socketIo = io(`https://waybox-realtime-staging.herokuapp.com/`, {
//       path: '/socket.io',
//       transports: ['websocket'],
//       auth: {
//         token: accessToken
//       },
//       query: { fcmToken, UID: userAgent }
//     })
//     if (socketIo) {
//       store.dispatch(SocketActions.initSocketSuccess())
//       startListening()
//     } else {
//       store.dispatch(SocketActions.initSocketError())
//     }
//   }
// }

export const getSocket = () => {
  const client = new W3CWebSocket('wss://transport-server.herokuapp.com/ws/chat/abc/');
  // client.onopen = () => {
    //   console.log('WebSocket Client Connected');
    // };
//   if (!isInitSocketIo) {
//     throw 'Socket is not ready'
//   }
  return client
}

// export const wrapperEmitSocket = (EmitFunction: () => void) => {
//   let socketIo = getSocket()
//   let isRetrying = false

//   EmitFunction()
//   const state: any = store.getState()

//   socketIo.onAny(async (event, __) => {
//     if (isRetrying) {
//       return
//     }
//     switch (event) {
//       case TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER_ERROR:
//         store.dispatch(
//           AuthActions.refreshTokenFailure(
//             TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER_ERROR
//           )
//         )
//         return
//       case TOKEN_EXPIRED_ERROR:
//         const userName = state.auth.userName
//         const refreshToken = state.auth.refreshToken
//         store.dispatch(AuthActions.refreshTokenRequest(userName, refreshToken))
//         break
//       default:
//         return
//     }
//     EmitFunction()
//     isRetrying = true
//   })
// }

// export const startListening = () => {
//   const socketIo = getSocket()

//   socketIo.onAny(async (event, ...args) => {
//     const payload = args[0].payload
//     const state: any = store.getState()

//     switch (event) {
//       case 'ready':
//         console.log('ready')

//         // EMIT SOCKET SUCCESS HERE

//         break
//       case FOUND_BIKERS_EVENT:
//         const bikers = payload.bikers.bikers
//         let rideHash = ''
//         if (payload.rideHash === undefined) {
//           rideHash = payload.deliveryHash
//         } else {
//           rideHash = payload.rideHash
//         }

//         store.dispatch(SocketActions.emitBookingSuccess())

//         const dataBikers = bikers.map((biker: any) =>
//           mapBikerFoundResultToFrontEnd(biker)
//         )

//         store.dispatch(PhaseActions.eventFoundBikerResult(dataBikers, rideHash))
//         return
//       case FIND_BIKER_NO_RESULTS:
//         store.dispatch(SocketActions.emitBookingError(FIND_BIKER_NO_RESULTS))
//         return
//       case RETRY_FIND_BIKER:
//         store.dispatch(SocketActions.emitBookingError(RETRY_FIND_BIKER))
//         return
//       case LOCATION_UPDATE:
//         console.log('location update', payload)
//         store.dispatch(
//           RideInforActions.updateLocationBiker(
//             payload.lng + Math.random() * 0.001,
//             payload.lat - Math.random() * 0.001
//           )
//         )
//         break
//       case GENERIC_ERROR:
//         console.log('errorororo', payload)
//         switch (payload) {
//           case RONT_RIDEHASH:
//             store.dispatch(SocketActions.emitChooseBikerError(RONT_RIDEHASH))
//             return
//           default:
//             return
//         }
//       case 'error':
//         console.log('error phone number')
//         console.log(payload)
//         break
//       default:
//         return
//     }
//   })
// }
