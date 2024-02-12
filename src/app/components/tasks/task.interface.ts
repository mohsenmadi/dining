export interface TaskInterface {
  id?: number;
  title: string;
  completed: string;
  createdAt: Date;
  updatedAt: Date;
}

export const NEW_TASK: TaskInterface = {
  title: '',
  completed: '',
  createdAt: new Date(),
  updatedAt: new Date(),
}
