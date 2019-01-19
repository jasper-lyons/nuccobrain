import fetch from "node-fetch"

exports.handler = async (event, context, callback) => {

  try {

    const apiKey = process.env.EVENTBRITE_TOKEN

    // Get a soonest-first feed of a given organiser's events
    const eventbriteFeed = `https://www.eventbriteapi.com/v3/users/me/events/?order_by=${(event.queryStringParameters.past)? "start_desc" : "start_asc"}&time_filter=${(event.queryStringParameters.past)? "past" : "current_future"}&token=${apiKey}`
    const response = await fetch(eventbriteFeed)
    const data = await response.json()

    // Only get the most recent five events
    let events = data.events.slice(0, 5)

    // This will store enriched event response
    let finalArray = []
    events.forEach(event =>{
       if(event.venue_id){
        finalArray
          .push(fetch(`https://www.eventbriteapi.com/v3/venues/${event.venue_id}?token=${apiKey}`)
            .then(res=>res.json())
            .then(data=>{
              event.venue = data.name
              return event
            }))
      } else {
        finalArray.push(event)
      }
    })
    const resolvedFinalArray = await Promise.all(finalArray)

    return  {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(resolvedFinalArray)
    }

  } catch(e) {

    console.log(e)
    return  {
      statusCode: 500,
      headers: {
          "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
          message: e
      })
    }
  }

}
