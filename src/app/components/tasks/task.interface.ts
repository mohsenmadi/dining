export interface TaskInterface {
  id?: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const NEW_TASK: TaskInterface = {
  title: '',
  completed: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}
