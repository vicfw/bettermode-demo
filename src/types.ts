export type Post = {
  id: string;
  slug: string;
  title: string;
  thumbnail: Thumbnail;
  createdAt: string;
  reactions: Reaction[];
  reactionsCount: number;
  fields: Fields[];
};

export type Thumbnail = {
  url: string;
  width: string;
  height: string;
};

export type Reaction = {
  count: number;
  reacted: boolean;
};

export type Fields = {
  key: string;
  value: string;
};
