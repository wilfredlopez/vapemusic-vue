import { gql } from "apollo-boost";
import {
  SongFragmentFragment,
  SongFragmentFragmentDoc,
  SongResponse
} from "./queryTypes";

import { createUseQuery, Maybe, Scalars } from "use-vue-hooks";

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

// export function useGetAllSongsQuery(
//   client: ApolloClient<GetAllSongsQuery>,
//   baseOptions?: Omit<
//     UseQueryOptions<GetAllSongsQuery, GetAllSongsQueryVariables>,
//     "query" | "client"
//   >
// ) {
//   return useQuery<GetAllSongsQuery, GetAllSongsQueryVariables>({
//     ...baseOptions,
//     query: GetAllSongsDocument,
//     client: client
//   });
// }

export const [useGetAllSongsQuery, useGetAllSongsLazyQuery] = createUseQuery<
  GetAllSongsQuery,
  GetAllSongsQueryVariables
>(GetAllSongsDocument);
