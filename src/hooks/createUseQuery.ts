//CREATED MY OWN PACKAGE FOR THIS npm i use-vue-hooks
export {};
// import useQuery, { Options } from "./useQuery";
// import { ApolloClient } from "apollo-boost";
// import { DocumentNode } from "graphql";
// import useLazyQuery from "./useLazyQuery";

// export default function createUseQuery<
//   QueryType extends {},
//   QueryTypeVariables extends {}
// >(queryDocument: DocumentNode) {
//   const query = (
//     client: ApolloClient<QueryType>,
//     baseOptions?: Omit<
//       Options<QueryType, QueryTypeVariables>,
//       "query" | "client"
//     >
//   ) => {
//     return useQuery<QueryType, QueryTypeVariables>({
//       ...baseOptions,
//       query: queryDocument,
//       client: client
//     });
//   };
//   const lazyQuery = (
//     client: ApolloClient<QueryType>,
//     baseOptions?: Omit<
//       Options<QueryType, QueryTypeVariables>,
//       "query" | "client"
//     >
//   ) => {
//     return useLazyQuery<QueryType, QueryTypeVariables>({
//       ...baseOptions,
//       query: queryDocument,
//       client: client
//     });
//   };

//   return [query, lazyQuery] as const;
// }
