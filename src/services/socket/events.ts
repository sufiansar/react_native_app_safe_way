// Real-Time Socket Event Constants for Safeway App

export const SOCKET_EVENTS = {
  // Connection Events
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  CONNECT_ERROR: 'connect_error',
  AUTHENTICATE: 'authenticate',

  // Real-Time SOS & Emergency Alerts
  TRIGGER_SOS: 'sos:trigger',
  SOS_ALERT_BROADCAST: 'sos:broadcast',
  RESOLVE_SOS: 'sos:resolve',

  // Real-Time Live Location Sharing
  UPDATE_LOCATION: 'location:update',
  LOCATION_SHARED: 'location:shared',
  STOP_LOCATION_SHARE: 'location:stop',

  // Real-Time Chat & Messaging
  JOIN_CONVERSATION: 'chat:join',
  LEAVE_CONVERSATION: 'chat:leave',
  SEND_MESSAGE: 'chat:send_message',
  NEW_MESSAGE: 'chat:new_message',
  TYPING_START: 'chat:typing_start',
  TYPING_STOP: 'chat:typing_stop',
  READ_RECEIPT: 'chat:read_receipt',

  // Real-Time Notifications
  NEW_NOTIFICATION: 'notification:new',

  // Real-Time Sisters Module
  SISTER_REQUEST_RECEIVED: 'sister:request_received',
  SISTER_REQUEST_ACCEPTED: 'sister:request_accepted',
};
