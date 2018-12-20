import bodymovin from 'lottie-web';

const initAnimation = (id, filename) => {
    if(document.getElementById(id)){
        bodymovin.loadAnimation({
            container: document.getElementById(id),
            path: `/assets/animations/${filename}`,
            name: id,
            renderer: 'svg',
            loop: true,
            autoplay: true
        })
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
    initAnimation('brand-storytelling-animation', 'Eye_animation.json')
    initAnimation('corporate-comms-animation', 'Lightbulb_animation.json')
    initAnimation('educational-content-animation', 'Globe_animation.json')
};

export default startAnimations;