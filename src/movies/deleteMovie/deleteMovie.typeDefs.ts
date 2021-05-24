import { gql } from "apollo-server-core";

export default gql`
  type DeleteMovieResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteMovie(id: Number): DeleteMovieResult!
  }
`;
