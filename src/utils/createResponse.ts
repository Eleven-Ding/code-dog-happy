export function createResponse(data: any, message: string, code = 0) {
  return {
    data,
    code,
    message,
  };
}
