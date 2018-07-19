import server from 'sharedUtils/server';

export const decrypt = <T>(data: any) => server.post<T>('decrypt', data);
