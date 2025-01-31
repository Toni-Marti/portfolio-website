interface Image {
  src: string;
  alt: string;
}

export interface ProjectInfo {
  title: string;
  description: Array<string>;
  img?: Image;
  vid_src?: string;
}
