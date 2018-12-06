import bodymovin from 'lottie-web';

const startAnimations = () => {
    let creativeInsights = bodymovin.loadAnimation({
        container: document.getElementById('creative-insights-animation'),
        path: '/assets/animations/creativeinsights_animation.json',
        renderer: 'svg',
        loop: true,
        autoplay: true,
        name: "Creative insights",
    });

    let howTo = bodymovin.loadAnimation({
        container: document.getElementById('how-to-animation'),
        path: '/assets/animations/howto_animation.json',
        renderer: 'svg',
        loop: true,
        autoplay: true,
        name: "How to",
    });

    let sectorChallenges = bodymovin.loadAnimation({
        container: document.getElementById('sector-challenges-animation'),
        path: '/assets/animations/bullseye_animation.json',
        renderer: 'svg',
        loop: true,
        autoplay: true,
        name: "Sector challenges",
    });

    // let talk = bodymovin.loadAnimation({
    //     container: document.getElementById('talk-animation'),
    //     path: '/assets/animations/Talk_animation.json',
    //     renderer: 'svg',
    //     loop: true,
    //     autoplay: true,
    //     name: "Talk",
    // });

};

export default startAnimations;