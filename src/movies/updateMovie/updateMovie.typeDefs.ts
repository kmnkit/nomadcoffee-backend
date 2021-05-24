import { gql } from "apollo-server-core";

export default gql`
  type UpdateMovieResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    updateMovie(title: String, year: Number, genre: String): UpdateMovieResult!
  }
`;
