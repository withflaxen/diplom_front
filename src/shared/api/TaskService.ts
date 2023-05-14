import {AxiosResponse} from 'axios';
import $api from './api';
import {ISolution, ITask, ITestPayload} from './types';

export class TaskService {
    static async getAllTasks(): Promise<AxiosResponse<ITask[]>> {
        return $api.get<ITask[]>('/tasks')
    }

    static async getTask(id:string): Promise<AxiosResponse<ITask>> {
        return $api.post<ITask>('/task' ,{id})
    }

    static async test(payload:ITestPayload): Promise<AxiosResponse<any>> {
        return $api.post<any>('/test' ,payload)
    }
    static async getSolutionsByTaskId(id:string): Promise<AxiosResponse<ISolution[]>> {
        return $api.post<any>('/taskSolutions' ,{id})
    }
}

