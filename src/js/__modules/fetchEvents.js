import moment from 'moment'

const host = (process.env.BACKEND_HOST)? process.env.BACKEND_HOST : 'http://localhost:9000'

export default () => {
    // Only proceed if the element is in the DOM
    if(document.querySelector('.events-list')){
        // TODO: Turn this into an environment variable
        fetch(`${host}/.netlify/functions/get-events`)
            .then(response=> response.json())
            .then(json=> processEvents(json))
            .catch(err=> handleError(err))
    }
}

const processEvents = (json) => {
    try {
        console.log(json)
        // New empty array to store processed results
        let processedEvents = []
        json.map((rawEvent)=>{
            const startDate = moment(rawEvent.start.local)
            const endDate = moment(rawEvent.end.local)
            processedEvents.push({
                name: rawEvent.name.text,
                image: (rawEvent.logo) ? rawEvent.logo.original.url : null,
                description: (rawEvent.description.text) ? rawEvent.description.text.split(".")[0] + "." : "",
                url: rawEvent.url,
                date: startDate.format('Do MMM'),
                startTime: startDate.format('ha'),
                endTime: endDate.format('ha'),

                desktopDays:startDate.format('D'),
                desktopMonth: startDate.format('MMM')
            })
        })
        // Display only the most recent five
        return displayEvents(processedEvents.slice(0, 5))
    } catch(e) {
        return handleError(e)
    }
}

const displayEvents = (processedEvents) => {
    const eventsList = document.querySelector('.events-list')
    // Clear out any existing content
    eventsList.innerHTML = ""
    // Display each event
    processedEvents.map((event)=>{
        eventsList.innerHTML += `
        <div class="event">
            <aside class="event__desktop-date">
                <span class="event__desktop-days">${event.desktopDays}</span>
                <span class="event__desktop-month">${event.desktopMonth}</span>
            </aside>
            <aside class="event__image-holder">
                ${(event.image)? `<img class="event__image" alt="${event.name}" src="${event.image}"/>` : `` }
            </aside>
            <aside class="event__text-holder">
                <h2 class="event__name">${event.name}</h2>
                <p class="event__date">${event.date}</p>
                <p class="event__time">${event.startTime}-${event.endTime}</p>
                <p class="event__description">${event.description}</p>
                <a class="btn btn--insights btn--padding" target="blank" href="${event.url}?aff="website events page">Sign up here</a>
            </aside>
        </div>
    `
    })
}

const handleError = (error) => {
    const eventsList = document.querySelector('.events-list')
    console.error("Failed to display events because:", error)
    eventsList.innerHTML = `<p class="events-error">There was a problem fetching events. Please visit <a href="https://www.eventbrite.co.uk/o/nucco-brain-15956478920">our Eventbrite</a>.</p>`
}