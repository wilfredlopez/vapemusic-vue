import { ApolloClient, gql } from "apollo-boost";
import {
  Maybe,
  Scalars,
  SongFragmentFragment,
  SongFragmentFragmentDoc,
  SongResponse
} from "./queryTypes";

import useQuery, { Options } from "./useQuery";

export type GetAllSongsQuery = { __typename?: "Query" } & {
  getAllSongs: { __typename?: "SongResponse" } & Pick<
    SongResponse,
    "totalCount"
  > & {
      songs: Array<{ __typename?: "Song" } & SongFragmentFragment>;
    };
};

export type GetAllSongsQueryVariables = {
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export const GetAllSongsDocument = gql`
  query GetAllSongs($skip: Int, $limit: Int) {
    getAllSongs(skip: $skip, limit: $limit) {
      totalCount
      songs {
        ...SongFragment
      }
    }
  }
  ${SongFragmentFragmentDoc}
`;

export function useGetAllSongsQuery(
  client: ApolloClient<GetAllSongsQuery>,
  baseOptions?: Omit<
    Options<GetAllSongsQuery, GetAllSongsQueryVariables>,
    "query" | "client"
  >
) {
  return useQuery<GetAllSongsQuery, GetAllSongsQueryVariables>({
    ...baseOptions,
    query: GetAllSongsDocument,
    client: client
  });
}
