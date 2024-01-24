import graphqlDataProvider,  { GraphQLClient, liveProvider as graphqlLiveProvider } from "@refinedev/nestjs-query";
import { createClient } from "graphql-ws"; //This is for creating a WebSocket client for GraphQL subscriptions.
import { fetchWrapper } from "./fetch-wrapper";

export const API_BASE_URL = "https://api.crm.refine.dev"
export const API_URL = "https://api.crm.refine.dev/graphql"
//WebSocket endpoint for the CRM API.
export const WS_URL = 'wss://api.crm.refine.dev/graphql'
//GraphQL Client Setup:to handle requests, providing enhanced error handling and potentially other features like adding authentication headers.
export const client = new GraphQLClient(API_URL,{
    fetch:(url: string, options:RequestInit) =>{
        try{
            return fetchWrapper(url, options);
        }catch(error){
            return Promise .reject(error as Error)
        }
    }
})
//WebSocket Client Setup:Creates a WebSocket client for real-time data using graphql-ws if the code is running in a browser environment (checked with typeof window !== "undefined"). 
//It configures the connection with an access token from local storage for authentication.
export const wsClient = typeof window !== "undefined" ? createClient({
        url: WS_URL,
        connectionParams: () => {
          const accessToken = localStorage.getItem("access_token");

          return {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
        },
      })
    : undefined;

export const dataProvider = graphqlDataProvider(client);

export const liveProvider = wsClient
  ? graphqlLiveProvider(wsClient)
  : undefined;