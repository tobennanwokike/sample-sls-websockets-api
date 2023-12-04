import { ApiGatewayManagementApiClient, PostToConnectionCommand } from "@aws-sdk/client-apigatewaymanagementapi";

export const handler = async (event, context) => {
  const { body, requestContext: { connectionId }} = event;
  console.log(event);
  console.log("*******");
  console.log(context);

  const apig = new ApiGatewayManagementApiClient({
    region: process.env.REGION,
    endpoint: process.env.APIG_ENDPOINT
  });

  try {
    const message = JSON.parse(body).message;
    await apig.send(new PostToConnectionCommand({
      ConnectionId: connectionId,
      Data: `Hello, I received your message on the custom route: ${message}`
    }));
    return { statusCode: 200 };
  } catch (error) {
    console.error("Error sending message: ", error);
    return { statusCode: 500, body: "Error sending message" };
  }
};