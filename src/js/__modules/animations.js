import bodymovin from 'lottie-web';

const initAnimation = (id, filename, autoplay = true, loop = true) => {
    if(document.getElementById(id)){
        return bodymovin.loadAnimation({
            container: document.getElementById(id),
            path: `/assets/animations/${filename}`,
            name: id,
            renderer: 'svg',
            loop: loop,
            autoplay: autoplay
        })
    } else {
        return null
    }
}

const startAnimations = () => {
    // Insights page
    initAnimation('creative-insights-animation', 'creative_insights_animation.json')
    initAnimation('how-to-animation', 'how_to_animation.json')
    initAnimation('sector-challenges-animation', 'bullseye_animation.json')
    // Contact us icon
    initAnimation('talk-animation', 'Talk_animation.json')


    // Work page
    const eye = initAnimation('brand-storytelling-animation', 'Eye_animation.json', false, false)
    const bulb = initAnimation('corporate-comms-animation', 'Lightbulb_animation.json', false, false)
    const globe = initAnimation('educational-content-animation', 'Globe_animation.json', false, false)
    
    setInterval(()=>{
        eye.play();
    }, 1000)
    setInterval(()=>{
        bulb.play();
    }, 3000)

    setInterval(()=>{
        globe.play();
    }, 7000)


};

export default startAnimations;