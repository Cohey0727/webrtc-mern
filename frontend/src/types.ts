type OnlineUser = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    picture: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  socketIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type { OnlineUser };
