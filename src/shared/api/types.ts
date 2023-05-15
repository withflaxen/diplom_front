export interface IUser {
    email: string;
    username: string;
    isActivated: boolean;
    id: string;
    role: "admin" | "user"
    _id: string
    password?:string
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface ITask {
    id: number
    title: string
    description: string
    testName: string
    name: string
    args: string[]
    difficulty: "easy"| "medium"| "hard"
    examples:string[]
    solutions: string[]
    users: string[]
}

export interface ITestPayload {
    id:string
    args:string
    code:string
}
export interface ISolutionsPayload {
   text: string
    taskId:any
    author: string
}

export interface ILike {
    solutionID:number
    userID:string
}

export interface ISolution {
    id: number
    likes: number // количество лайков у задачи
    comments: IComment[], // id, комментарий, username
    taskID: string
    username: string
    isActive: boolean
    solution: string
}

export interface IComment {
    id?: number
    solutionID: number
    comment: string
    username: string
}
export interface IDeleteComment {
    solutionID: number
    id: number
}