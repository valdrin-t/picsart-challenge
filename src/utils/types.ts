export interface Photo {
  id: string;
  alt_description: string;
  description: string;
  height: number;
  width: number;
  urls: {
    small: string;
    full: string;
    regular: string;
  };
  created_at: string;
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
  };
}
