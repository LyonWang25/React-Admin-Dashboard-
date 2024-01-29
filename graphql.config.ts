import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
    //define graphQl schema provided by Refine
  schema: "https://api.crm.refine.dev/graphql",
  extensions: {
    //code generation is a plugin that generates typescript types from GraphQL schema
    //https://the-guild.dev/graphql/codegen
    codegen: {
      //hooks are commands that are executed after a certain event
      hooks: {
        afterOneFileWrite: ["eslint --fix", "prettier --write"],
      },
      //generates typescript types from GraphQL schema (Specifies what files to generate and how.)
      generates: {
        // specify the output path of the generated types(This is the output file for types generated from the GraphQL schema.)
        "src/graphql/schema.types.ts": {
            //use typescript plugin ( It uses the typescript plugin to generate TypeScript types.)
          plugins: ["typescript"],
          //set the config of the typescript plugin
          //this defines how the generated types will look like
          config: {
            skipTypename: true,//skipTypename is used to remove __typename from the generated types
            //(When skipTypename set to true, it excludes the __typename field from the generated types. This is often used to simplify the types when __typename is not needed.)
            enumsAsTypes: true,//enumsAsTypes is used to generate enums as types instead of enums
            //Converts GraphQL enums to TypeScript types instead of enums. This can be preferable depending on how you want to use these enums in your code.

            //scalars is used to define how the scalars i.e. DateTime, JSON, etc. will be generated
            //Defines custom scalars and how they should be represented in TypeScript. For example, DateTime is mapped to string type with a format of date-time.
            //scalar is a type that is not a list and does not have fields. Meaning it is a primitive type ex. string, number, boolean, etc.
            scalars: {
              //DateTime is a scalar type that is used to represent date and time
              DateTime: {
                input: "string",
                output: "string",
                format: "date-time",
              },
            },
          },
        },
        //generates typescript types from GraphQL operations
        //GraphQL operations are queries, mutations, and subscriptions
        //we write in our code to communicate with the GraphQL API
        //This file will contain types generated from your GraphQL queries, mutations, and subscriptions.
        "src/graphql/types.ts": {
          //preset is a plugin that is used to generate typescript types from GraphQL operations
          //import-types suggests to import types from schema.types.ts or other files
          //this is used to avoid duplication of types
          //https://the-guild.dev/graphql/codegen/plugins/presets/import-types-preset
          preset: "import-types",
          //documents is used to define the plugins that will be used to generate typescript types from GraphQL operations(Points to the location of your GraphQL operations within your codebase.)
          documents: ["src/**/*.{ts,tsx}"],
          //plugins is used to define the plugins that will be used to generate typescript types from GraphQL operations
          plugins: ["typescript-operations"],
          config: {
            skipTypename: true,
            enumsAsTypes: true,
            //determine whether the generated types should be resolved ahead of time or not
            //when preResolveTypes is set to true, the generated types will be resolved ahead of time
            // Instead, it will generate more generic types, and the actual types will be resolved at runtime.
            preResolveTypes: false,
            useTypeImports: true,
          },
          //presetConfig is used to define the config of the preset( Specifies the path to import types from, which in this case is your generated schema.types.ts)
          presetConfig: {
            typesPath: "./schema.types",
          },
        },
      },
    },
  },
};

export default config;

// Summary
// In summary, this configuration file tells GraphQL Code Generator to:

// 1. Fetch your GraphQL schema from the given API URL.
// 2. Generate TypeScript types for your schema and save them in src/graphql/schema.types.ts.
// 3. Generate TypeScript types for your GraphQL operations (queries, mutations, subscriptions) 
//    based on the files in your project, and save these types in src/graphql/types.ts.
// 4. Run ESLint and Prettier on the generated files for code quality and formatting.
// The configuration is quite sophisticated, ensuring that the types generated are in line with best practices 
// and that they integrate well with the rest of your TypeScript codebase. The use of custom scalars, presets, 
// and plugins makes the generated types very powerful and tailored to your specific GraphQL schema and operations.