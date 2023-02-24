export type CategoryName = 'home' | 'work' | 'shopping' | 'hobbies' | 'others';

export interface Category {
  id: number;
  name: CategoryName;
}