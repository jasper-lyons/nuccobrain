import moment from 'moment'

export default () => {
    // Initial page load
    if(document.querySelector('.events-list')){
        requestEventData(false)
    }
    // Get all clickable event filter items
    document.querySelectorAll('.events-menu__menu .menu-item').forEach((i)=>{
        i.addEventListener('click', (e)=>{
        
            // Remove active class from all items first
            document.querySelectorAll('.events-menu__menu .menu-item').forEach(j=>{
                j.classList = "menu-item"
            })
            // And re-add to active item
            i.classList.add("current-menu-item")
            // And make the request
            if(i.dataset.filter === "past"){
                requestEventData(true)
            } else {
                requestEventData(false)
            }

        })
    })
}

const requestEventData = (past) => {
    fetch(`https://nuccobrain-staging.netlify.com/.netlify/functions/fetch-events${(past)? "?past=1" : ""}`)
        .then(response=> response.json())
        .then(json=> processEvents(json, past))
        .catch(err=> handleError(err))
}

const processEvents = (json, past) => {
    try {
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
                venue: (rawEvent.venue)? rawEvent.venue : "",

                desktopDays:startDate.format('D'),
                desktopMonth: startDate.format('MMM'),
                desktopYear: startDate.format('Y')
            })
        })
        // Display them
        return displayEvents(processedEvents, past)
    } catch(e) {
        return handleError(e)
    }
}

const displayEvents = (processedEvents, past) => {
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
                ${(past)? `<span class="event__desktop-year">${event.desktopYear}</span>` : ""}
            </aside>
            <aside class="event__image-holder">
                ${(event.image)? `<img class="event__image" alt="${event.name}" src="${event.image}"/>` : `` }
            </aside>
            <aside class="event__text-holder">
                <h2 class="event__name">${event.name}</h2>
                <p class="event__venue">${event.venue}</p>
                <p class="event__time"><span class="event__mobile-date">${event.date}${(past) ? " " + event.desktopYear : ""}, </span>${event.startTime}-${event.endTime}</p>
                <p class="event__description">${event.description}</p>
                <a class="btn btn--insights btn--padding" target="blank" href='${event.url}?aff=WebsiteEventsPage'>${(past)? "See details" : "Sign up here"}</a>
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
