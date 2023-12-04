export const handler = async (event, context) => {
    console.log(event);
    console.log("*******");
    console.log(context);
    return { statusCode: 200 };
};