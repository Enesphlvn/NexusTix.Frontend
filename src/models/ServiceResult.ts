export interface ServiceResult<T>{
    data: T;
    urlAsCreated: string | null;
    isSuccess: boolean;
    status: number;
    errorMessages: string[]
}