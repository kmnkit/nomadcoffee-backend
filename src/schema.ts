import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { GraphQLSchema } from "graphql";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(
	`${__dirname}/**/*.{queries,mutations}.js` // __dirname은 dist
);
const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
