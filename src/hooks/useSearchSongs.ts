import {
  SongFragmentFragment,
  SongFragmentFragmentDoc,
  SongResponse
} from "./queryTypes";
import { gql } from "apollo-boost";

//MY OWN Library
import { createUseQuery, Maybe, Scalars } from "use-vue-hooks";

export type SearchSongsQuery = { __typename?: "Query" } & {
  searchSongs: { __typename?: "SongResponse" } & Pick<
    SongResponse,
    "totalCount"
  > & {
      songs: Array<{ __typename?: "Song" } & SongFragmentFragment>;
    };
};

export type SearchSongsQueryVariables = {
  query: Scalars["String"];
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export const SearchSongsDocument = gql`
  query SearchSongs($query: String!, $skip: Int, $limit: Int) {
    searchSongs(query: $query, skip: $skip, limit: $limit) {
      totalCount
      songs {
        ...SongFragment
      }
    }
  }
  ${SongFragmentFragmentDoc}
`;

// export function useSearchSongsQuery(
//   client: ApolloClient<SearchSongsQuery>,
//   baseOptions?: Omit<
//     Options<SearchSongsQuery, SearchSongsQueryVariables>,
//     "query" | "client"
//   >
// ) {
//   return useQuery<SearchSongsQuery, SearchSongsQueryVariables>({
//     ...baseOptions,
//     query: SearchSongsDocument,
//     client
//   });
// }

// export function useSearchSongsLazyQuery(
//   client: ApolloClient<SearchSongsQuery>,
//   baseOptions?: Omit<
//     LazyOptions<SearchSongsQuery, SearchSongsQueryVariables>,
//     "query" | "client"
//   >
// ) {
//   return useLazyQuery<SearchSongsQuery, SearchSongsQueryVariables>({
//     ...baseOptions,
//     query: SearchSongsDocument,
//     client
//   });
// }

export const [useSearchSongsQuery, useSearchSongsLazyQuery] = createUseQuery<
  SearchSongsQuery,
  SearchSongsQueryVariables
>(SearchSongsDocument);
