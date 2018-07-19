import server from 'sharedUtils/server';

export const forgotPassword = <T>(data: any) => server.post<T>('forgotPassword/forgotPassword', data);
