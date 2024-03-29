export const typeDefs = `#graphql
    type User {
        id: Int!
        username: String!
        email: String!
        password: String!
        name: String
        location: String
        avatarURL: String
        githubUsername: String
        createdAt: String
        updatedAt: String
    }
    type Query {
        seeProfile(id: Int!): User
    }
    type Mutation {
        createUser(
            username: String
            email: String
            name: String
            location: String
            password: String
            avatarURL: String?
            githubUsername: String?
        ): User
        
    }
`;
