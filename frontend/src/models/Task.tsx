export interface Task {
    id: number | null;
    title: string;
    body: string;
    created_by: string;
    completed: boolean;
};