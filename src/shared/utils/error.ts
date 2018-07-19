export interface IException {
  httpCode: number,
  message: string
}

export const isBadRequest = (response: Response) => {
  return response.status === 400;
};

export const isNoContent = (response: Response) => {
  return response.status === 204;
};
