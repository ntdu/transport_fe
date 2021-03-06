export type SocketEventType =
  | 'connection'
  | 'heartbeat'
  | 'booking'
  | 'found_bikers'
  | 'biker_chosen'
  | 'ride_confirmed'
  | 'ride_cancelled'
  | 'location_update'
  | 'ride_complete'
  | 'ride_in_progress'
  | 'biker_waiting'
  | 'delivery_booking'
  | 'delivery_biker_chosen'
  | 'delivery_confirmed'
  | 'delivery_biker_waiting'
  | 'biker_received_package'
  | 'delivery_complete'

export const CONNECT_EVENT: SocketEventType = 'connection'
export const HEARTBEAT_EVENT: SocketEventType = 'heartbeat'
export const BOOKING_EVENT: SocketEventType = 'booking'
export const FOUND_BIKERS_EVENT: SocketEventType = 'found_bikers'
export const BIKER_CHOSEN_EVENT: SocketEventType = 'biker_chosen'
export const RIDE_CONFIRMED_EVENT: SocketEventType = 'ride_confirmed'
export const RIDE_CANCELLED_EVENT: SocketEventType = 'ride_cancelled'
export const LOCATION_UPDATE: SocketEventType = 'location_update'
export const RIDE_COMPLETE_EVENT: SocketEventType = 'ride_complete'
export const RIDE_IN_PROGRESS_EVENT: SocketEventType = 'ride_in_progress'
export const BIKER_WAITING: SocketEventType = 'biker_waiting'
export const DELIVERY_BOOKING: SocketEventType = 'delivery_booking'
export const DELIVERY_BIKER_CHOSEN_EVENT: SocketEventType =
  'delivery_biker_chosen'
export const DELIVERY_CONFIRMED_EVENT: SocketEventType = 'delivery_confirmed'
export const DELIVERY_BIKER_WAITING: SocketEventType = 'delivery_biker_waiting'
export const BIKER_RECEIVED_PACKAGE: SocketEventType = 'biker_received_package'
export const DELIVERY_COMPLETE_EVENT: SocketEventType = 'delivery_complete'

export type ErrorType =
  | 'RETRY_FIND_BIKER'
  | 'FIND_BIKER_NO_RESULTS'
  | 'GENERIC_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'RONT_RIDEHASH'
  | 'TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER'
  | 'UNRECOVERABLE_ERROR'
  | 'TOKEN_EXPIRED'

export const RETRY_FIND_BIKER: ErrorType = 'RETRY_FIND_BIKER'
export const FIND_BIKER_NO_RESULTS: ErrorType = 'FIND_BIKER_NO_RESULTS'
export const GENERIC_ERROR: ErrorType = 'GENERIC_ERROR'
export const AUTHENTICATION_ERROR: ErrorType = 'AUTHENTICATION_ERROR'

export type ErrorMessage = 'Something went wrong with ridehash'
export const RONT_RIDEHASH: ErrorMessage = 'Something went wrong with ridehash'
export const TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER_ERROR: ErrorType =
  'TOKEN_IS_NOT_AUTHENTICATED_BY_SERVER'
export const TOKEN_EXPIRED_ERROR: ErrorType = 'TOKEN_EXPIRED'
export const UNRECOVERABLE_ERROR: ErrorType = 'UNRECOVERABLE_ERROR'
