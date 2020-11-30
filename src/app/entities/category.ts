export interface Category {
  id: number;
  name: string;
  image?: Image;
  parent?: Category;
  isDeleted: boolean;
}

export interface Image {
  id: number;
  name: string;
}
