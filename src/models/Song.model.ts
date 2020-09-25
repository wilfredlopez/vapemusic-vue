import { Scalars } from "./Scalars";

export type Maybe<T> = T | null;

export type Song = {
  __typename?: "Song";
  id: Scalars["ID"];
  artist: Scalars["String"];
  title: Scalars["String"];
  genre: Scalars["String"];
  album?: Maybe<Scalars["String"]>;
  viewCount?: Maybe<Scalars["Int"]>;
  promoted?: Maybe<Scalars["Boolean"]>;
  imageUrl: Scalars["String"];
  audioUrl: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  artistList: Array<Scalars["String"]>;
  name: Scalars["String"];
};
