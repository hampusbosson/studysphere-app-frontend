export type BaseEntity = {
    id: string;
}

export type Entity<T> = {
    [K in keyof T]: T[K];
} & BaseEntity;

export type User = Entity<{
    email: string;
    isVerified: boolean;
}>

export type ApiResponse = {
    user: User;
    token: string;
}

export type Course = Entity<{
    name: string;
    lectures?: Lecture[];
}>

export type Lecture = Entity<{
    title: string;
    content?: string;
    summarizedContent?: string;
    url?: string;
    classId: string;
}>