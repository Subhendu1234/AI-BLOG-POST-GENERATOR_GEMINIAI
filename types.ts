
export interface Source {
  uri: string;
  title: string;
}

export interface BlogPost {
  content: string;
  sources: Source[];
}
