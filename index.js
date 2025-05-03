const main = () => {
    const linkToCode = document.getElementById('ext-link-github');
    const linkToPlaylist = document.getElementById('ext-link-spotify');
    const scrollContainer = document.getElementById('music-scroll-container');

    // Timeline animation
    const timelineContainer = document.getElementById('dynamic-timeline-container');
    const timeline = document.getElementById('timeline-marker');
    let { timelineAnimationStart, timelineAnimationEnd } = handleTimelineResize(timelineContainer, timeline);

    linkToCode.addEventListener('click', () =>
        redirect('https://github.com/jerling2/MySpotify')
    );

    linkToPlaylist.addEventListener('click', () => 
        redirect('https://open.spotify.com/playlist/7K2ImbL3CVtGexjq7arClB?si=9368b5e540a242e6&pt=e5f20d63cfd5b66b2b63f5e4af115d09')
    );

    window.addEventListener('resize', () => {
        ({ timelineAnimationStart, timelineAnimationEnd } = handleTimelineResize(timelineContainer, timeline));
        const offset = calcTimelineOffset(
            scrollContainer,
            timelineAnimationStart,
            timelineAnimationEnd
        );
        moveTimeline(timeline, offset);
    });

    scrollContainer.addEventListener('scroll', () => {
        const offset = calcTimelineOffset(
            scrollContainer,
            timelineAnimationStart,
            timelineAnimationEnd
        );
        console.log(`Scroll offset: ${offset}`);
        moveTimeline(timeline, offset);
    });
}

function scrollProgress(htmlElement) {
    const maxScroll = htmlElement.scrollHeight - htmlElement.clientHeight;
    const numScroll =  htmlElement.scrollTop / maxScroll;
    return Math.round(numScroll * 100) / 100;
}

function lerp(start, end, f) {
    return start + end * f;
}

function redirect(url) {
    window.location.href = url;
}

function handleTimelineResize(timelineContainer, timeline) {
    const timelineRect = timeline.getBoundingClientRect();
    const timelineContainerRect = timelineContainer.getBoundingClientRect();
    const timelineAnimationStart = 0; //< relative to parent (aka. not the window)
    const timelineAnimationEnd = timelineContainerRect.width - timelineRect.width;
    return {
        timelineAnimationStart, 
        timelineAnimationEnd
    };
}

function calcTimelineOffset(htmlElement, start, end) {
    const f = scrollProgress(htmlElement);
    const l = lerp(start, end, f);
    return l;
}

function moveTimeline(htmlElement, offset) {
    htmlElement.style.left = `${offset}px`;
}

main();