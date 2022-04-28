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
  tags: TAG[];
  is_active: boolean;
  image: File | null;
}

export interface LOGIN_USER {
  id: number;
  email: string;
  name: string;
}
