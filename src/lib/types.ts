interface Image {
    src: string
    alt: string
}

export interface ProjectInfo {
    unique_id: number;
    title: string;
    description: string;
    img?: Image;
    vid_src?: string;
}