export interface Photo {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    full: string;
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
