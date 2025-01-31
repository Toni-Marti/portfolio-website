import type { ProjectInfo } from "./types";

export const cards_content: Array<ProjectInfo> = [
  {
    title: "AI Models",
    description: [
      "I've developed multiple AI models. The two I've spent the most time on so far are:",
      "- A wheatear prediction model: It is able to predict with high accuracy (>95%) various weather related metrics based on the data of the past 7 days. For this project I had to go through all the steps related to training a model, from gathering and normalizing the data to designing model architecture.",
      "- An image classification model: Given a dataset of 100 classes I designed and trained a model that was able to classify them with 75% accuracy.",
    ],
  },
  {
    title: "Nextcloud Server",
    description: [
      "This project involves the deployment and maintenance of a self-hosted file storing server. Nextcloud is an open source alternative to things like Google Drive or Dropbox.",
      "First tried to set it up when right when I started university, so it was way before I has sufficient knowledge to do it. But after bashing my head against the wall for a while I managed to get it working. Since then, it was presented me with a hole bunch of unsuspected challenges any server administrator would face.",
      "One of those challenges came up because the network I have the server running on doesn't dispose of a static IP, so the model would become unreachable every time the IP changed. To solve this I created a script that runs every couple minutes, fetches the server's IP from the web and if it detects a change it then uses the API provided by the domain name registrar use to update the DNS records; all while sending me an email with a log of the process.",
      "On nextcloud.tonimartal.com you can see it's login screen.",
    ],
  },
  {
    title: "Video Games",
    description: [
      "Love making games. They are the first coding related thing I tried to do.",
      "I mainly do them on Game Jams. They hae ben a great way of getting to know new people and learning to teamwork under tight deadlines.",
    ],
    vid_srcs: ["/videos/Games.mp4"],
  },
  {
    title: "3D Graphics",
    description: [
      "Worked with OpenGL. I really liked my Computer Graphics class, below are some examples of my assignments. The first one showcases extrusion of a shape through a 3D path. The second one recursive scene trees. The last one texture mapping.",
    ],
    vid_srcs: ["/videos/IG_P3.mp4", "/videos/IG_P2.mp4", "/videos/IG_P4.mp4"],
  },
  {
    title: "Websites",
    description: [
      "I've also done playfull websites.",
      "The one showing below shows a version of tic-tac-toe in which each cell can also be a board and the last move of your opponent dictates in which cell/board you can place next. You win if you manage to make three in a row on the outer board.",
    ],
    vid_srcs: ["/videos/UTTT.mp4"],
  },
  {
    title: "Advent of Code",
    description: [
      "My university creates a student leaderboard each year and I have a fun time joining the competition.",
      "AoC is a advent calendar that presents you with progressively hard coding challenges. I use it as an opportunity to learn a new programming language I'd like to know, it was the way I began to use Python.",
      "You can see my entries on my github page ( github.com/Toni-Marti ).",
    ],
  },
];
