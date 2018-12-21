import fetch from "node-fetch"

exports.handler = async (event, context, callback) => {
    // Get a soonest-first feed of a given organiser's events
    const eventbriteFeed = `https://www.eventbriteapi.com/v3/events/search/?sort_by=date&organizer.id=${process.env.OID}&token=${process.env.EVENTBRITE_TOKEN}`
    const response = await fetch(eventbriteFeed)
    const data = await response.json()
    return  {
      statusCode: 200,
      body: JSON.stringify(data.events)
    }
}
