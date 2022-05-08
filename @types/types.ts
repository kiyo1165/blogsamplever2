export interface CRED {
  email: string;
  password: string;
}

export interface TAG {
  id: number;
  name: string;
}

export interface TAG_POST {
  id: number;
}

export interface BLOG_POST {
  title: string;
  content: string;
  user: number;
  tags: TAG_POST[];
  is_active: boolean;
  image: any;
}

export interface LOGIN_USER {
  id: number;
  email: string;
  name: string;
}

export interface GET_BLOGS {
  id: number;
  title: string;
  user: number;
  username: string;
  tags: TAG[];
  content: string;
  is_active: true;
  image: File | any;
  created_at: string;
}
