import fetch from "node-fetch"

exports.handler = async (event, context, callback) => {
    const apiKey = process.env.BEHANCE_KEY

    try {

        if(event.queryStringParameters.projectid){
            const behanceFeed = `https://www.behance.net/v2/projects/${event.queryStringParameters.projectid}?api_key=${apiKey}`
            const response = await fetch(behanceFeed)
            const data = await response.json()

            return  {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
            }
        } else {
            const behanceFeed = `https://www.behance.net/v2/collections/${event.queryStringParameters.collectionid}/projects?api_key=${apiKey}`
            const response = await fetch(behanceFeed)
            const data = await response.json()
            return  {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
            }
        }

    } catch(e) {
        return  {
            statusCode: 422,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                message: "You need to provide either a collection ID or a project ID"
            })
        }
    }
}
