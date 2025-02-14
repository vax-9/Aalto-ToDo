export type toDoData = toDo[];

export type toDo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type filters = {
  selectedUserId?: number;
  compleated?: boolean;
  searchValue?: string;
};
