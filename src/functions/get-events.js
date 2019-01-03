import fetch from "node-fetch"

exports.handler = async (event, context, callback) => {
  try {
    // Get a soonest-first feed of a given organiser's events
    const eventbriteFeed = `https://www.eventbriteapi.com/v3/users/me/events/?order_by=start_asc&time_filter=current_future&token=${process.env.EVENTBRITE_TOKEN}`
    const response = await fetch(eventbriteFeed)
    const data = await response.json()
    return  {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data.events)
    }
  } catch(e) {
    console.log(e)
    return  {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(e)
    }
  }
}
