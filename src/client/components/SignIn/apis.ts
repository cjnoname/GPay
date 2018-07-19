import server from 'sharedUtils//server';

export const signIn = <T>(data: any) => server.post<T>('account/signIn', data);
