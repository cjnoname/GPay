import { IException, isNoContent } from './error';
import fetch from 'node-fetch';

const fetchIt = (typeof window !== 'undefined' && window.fetch) ? window.fetch : fetch as any;

const sharedHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

const buildURL = (path: string) => path.indexOf('?') > 0 ? `api/${path}` : `api/${path}`;

const get = <T>(path: string, data?: any, headers = {}, external: boolean = false): Promise<T | undefined> => {
  path = data ? `${path}?${getQueryString(data)}` : path;
  return doFetch(path, null, HttpMethods.GET, headers, external);
};

const getQueryString = (params: any) => (
  Object
    .keys(params)
    .map(k => {
      if (Array.isArray(params[k])) {
        return params[k]
          .map((val: any) => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
          .join('&');
      }

      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    })
    .join('&'));

const post = <T>(path: string, data: any, headers = {}, external: boolean = false): Promise<T | undefined> => (
  doFetch(path, data, HttpMethods.POST, headers, external));

const put = <T>(path: string, data: any, headers = {}, external: boolean = false): Promise<T | undefined> => (
  doFetch(path, data, HttpMethods.PUT, headers, external));

const del = <T>(path: string, data: any, headers = {}, external: boolean = false): Promise<T | undefined> =>
  (doFetch(path, data, HttpMethods.DELETE, headers, external));

const doFetch = async (path: string, data: any, method: HttpMethods, headers = {}, external: boolean = false) => {
  const request = {
    method,
    headers: {
      ...headers,
      ...sharedHeaders
    }
  } as any;
  if (method !== HttpMethods.GET) {
    request.body = data ? JSON.stringify(data) : null;
  }
  try {
    const finalPath = external ? path : buildURL(path);
    const response: Response = await fetchIt(finalPath, request);
    if (!response.ok) {
      const error: IException = { httpCode: response.status, message: await response.json() };
      throw error;
    }
    return getResult(response);
  } catch (e) {
    if (e.httpCode) {
      // console.log(e.message);
    }
    // console.log(e);
  }
};

const getResult = (response: Response) => {
  if (isNoContent(response)) {
    return undefined;
  }
  if (/application\/json/.test(response.headers.get('Content-Type')!)) {
    return response.json();
  } else {
    return response.text();
  }
};

const simpleGet = <T>(path: string) => {
  return get<T>(path, undefined, undefined, true);
};

export default {
  buildURL,
  simpleGet,
  get,
  post,
  put,
  delete: del
};
