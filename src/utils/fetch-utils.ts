import { ErrorObject } from '../../interfaces';

export const dataIsError = (data: any): data is ErrorObject => {
    return (data as ErrorObject).error !== undefined;
}