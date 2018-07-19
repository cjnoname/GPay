import server from 'sharedUtils/server';

export const getInitialValues = <T>() => server.get<T>('theme');
