export interface TaskInterface {
  id?: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  children?: TaskInterface[];
  expanded: boolean;
}

export const NEW_TASK: TaskInterface = {
  title: '',
  completed: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  expanded: false
}
