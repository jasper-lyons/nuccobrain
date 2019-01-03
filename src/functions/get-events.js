import fetch from "node-fetch"

exports.handler = (event, context, callback) => {

  try {
    // Get a soonest-first feed of a given organiser's events
    const eventbriteFeed = `https://www.eventbriteapi.com/v3/users/me/events/?order_by=start_asc&time_filter=current_future&token=${process.env.EVENTBRITE_TOKEN}`
    fetch(eventbriteFeed)
      .then(res=>res.json())
      .then(data=>{
        return  {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify(data.events)
        }
      })
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
