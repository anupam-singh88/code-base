export const HTTP_STATUS = {
  // 2xx: Success
  OK: 200, // The request has succeeded.
  CREATED: 201, // The request has been fulfilled and resulted in a new resource being created.
  ACCEPTED: 202, // The request has been accepted for processing, but the processing has not been completed.
  NO_CONTENT: 204, // The server has successfully fulfilled the request, but there is no content to return.

  // 4xx: Client Errors
  BAD_REQUEST: 400, // The server could not understand the request due to invalid syntax.
  UNAUTHORIZED: 401, // The client must authenticate itself to get the requested response.
  FORBIDDEN: 403, // The client does not have access rights to the content.
  NOT_FOUND: 404, // The server can not find the requested resource.
  METHOD_NOT_ALLOWED: 405, // The method specified in the request is not allowed.
  CONFLICT: 409, // Indicates a conflict, such as trying to create a duplicate resource.

  // 5xx: Server Errors
  INTERNAL_SERVER_ERROR: 500, // The server has encountered a situation it doesn't know how to handle.
  NOT_IMPLEMENTED: 501, // The server does not support the functionality required to fulfill the request.
  BAD_GATEWAY: 502, // The server received an invalid response from the upstream server.
  SERVICE_UNAVAILABLE: 503, // The server is currently unable to handle the request due to a temporary overload or maintenance.
  GATEWAY_TIMEOUT: 504, // The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.
};
