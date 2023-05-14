import {AxiosResponse} from 'axios';
import $api from './api';
import {IComment, IDeleteComment, ILike, ISolution, ISolutionsPayload} from './types';

export class SolutionsService {

    static async postSolution(payload:ISolutionsPayload): Promise<AxiosResponse<any>> {
        return $api.post<any>('/createSolution' ,payload)
    }
    static async like(payload:ILike): Promise<AxiosResponse<ISolution>> {
        return $api.post<any>('/like' ,payload)
    }
    static async addComment(payload:IComment): Promise<AxiosResponse<ISolution>> {
        return $api.post<any>('/addComment' ,payload)
    }
    static async deleteComment(payload:IDeleteComment): Promise<AxiosResponse<ISolution>> {
        return $api.post<any>('/deleteComment' ,payload)
    }
}