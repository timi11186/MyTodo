interface RequestOptions {
    method: string;
    params: any;
    headers?: any; 
    [key:string]:any
}

interface Request {
    (url: string, options: RequestOptions): Promise<any>;
}

export { Request, RequestOptions, Headers };
