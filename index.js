const main = () => {
    const linkToCode = document.getElementById('ext-link-github');
    const linkToPlaylist = document.getElementById('ext-link-spotify');
    const scrollContainer = document.getElementById('music-scroll-container');

    // Timeline animation
    const timelineContainer = document.getElementById('dynamic-timeline-container');
    const timeline = document.getElementById('timeline-marker');
    let { timelineAnimationStart, timelineAnimationEnd } = handleTimelineResize(timelineContainer, timeline);
    
    // Timeline timestamps
    const highTimestamp = document.getElementById('timeline-timestamp--high');
    const highTimestampTarget = document.getElementById('timeline-timestamp--high-here');
    const undergradTimestamp = document.getElementById('timeline-timestamp--undergrad');
    const undergradTimestampTarget = document.getElementById('timeline-timestamp--undergrad-here');
    const graduateTimestamp = document.getElementById('timeline-timestamp--graduate');
    const graduateTimestampTarget = document.getElementById('timeline-timestamp--graduate-here');
    const strikeTimestamp = document.getElementById('timeline-timestamp--strike');
    const strikeTimestampTarget = document.getElementById('timeline-timestamp--strike-here');
    placeTimestamp(scrollContainer, timelineContainer, highTimestamp, highTimestampTarget);
    placeTimestamp(scrollContainer, timelineContainer, undergradTimestamp, undergradTimestampTarget);
    placeTimestamp(scrollContainer, timelineContainer, graduateTimestamp, graduateTimestampTarget);
    placeTimestamp(scrollContainer, timelineContainer, strikeTimestamp, strikeTimestampTarget);

    // Click the 'timeline-vector' to quickly & smoothly scroll the 'music-scroll-container'. 
    const timelineVector = document.getElementById('timeline-vector');
    timelineVector.addEventListener('click', (e) => {
        const width = timelineVector.offsetWidth;
        const f = e.offsetX / width;
        const l = lerp(0, scrollContainer.scrollHeight, f);
        scrollContainer.scrollTo({
            top: l,
            behavior: "smooth"
        });
    });

    /* These statements are equivalent to <a href='[url]' target="_blank> ... </a> */
    linkToCode.addEventListener('click', () =>
        window.open('https://github.com/jerling2/MySpotify', target='_blank')
    );
    linkToPlaylist.addEventListener('click', () => 
        window.open('https://open.spotify.com/playlist/7K2ImbL3CVtGexjq7arClB?si=9368b5e540a242e6&pt=e5f20d63cfd5b66b2b63f5e4af115d09', target='_blank')
    );

    window.addEventListener('resize', () => {
        ({ timelineAnimationStart, timelineAnimationEnd } = handleTimelineResize(timelineContainer, timeline));
        const offset = calcTimelineOffset(
            scrollContainer,
            timelineAnimationStart,
            timelineAnimationEnd
        );
        translateX(timeline, offset);
        placeTimestamp(scrollContainer, timelineContainer, highTimestamp, highTimestampTarget);
        placeTimestamp(scrollContainer, timelineContainer, undergradTimestamp, undergradTimestampTarget);
        placeTimestamp(scrollContainer, timelineContainer, graduateTimestamp, graduateTimestampTarget);
    });

    scrollContainer.addEventListener('scroll', () => {
        const offset = calcTimelineOffset(
            scrollContainer,
            timelineAnimationStart,
            timelineAnimationEnd
        );
        translateX(timeline, offset);
    });
}

function scrollProgress(htmlElement) {
    const maxScroll = htmlElement.scrollHeight - htmlElement.clientHeight;
    const numScroll =  htmlElement.scrollTop / maxScroll;
    return Math.round(numScroll * 100) / 100;
}

function scrollLocation(parent, target) {
    const maxScroll = parent.scrollHeight - parent.clientHeight;
    const numScroll = target.offsetTop / maxScroll;
    return Math.round(numScroll * 100) / 100;
}

function lerp(start, end, f) {
    return start + end * f;
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

function calcTimelineTargetOffset(parent, target, start, end) {
    const f = scrollLocation(parent, target);
    const l = lerp(start, end, f);
    return l;
}

function placeTimestamp(scrollContainer, timelineContainer, timestamp, target) {
    const timelineContainerRect = timelineContainer.getBoundingClientRect();
    const timestampRect = timestamp.getBoundingClientRect();
    const maxPosition = timelineContainerRect.width;
    const offset = calcTimelineTargetOffset(
        scrollContainer,
        target,
        0,
        maxPosition
    );
    translateX(timestamp, offset - timestampRect.width / 2);
}

function translateX(htmlElement, offset) {
    htmlElement.style.left = `${offset}px`;
}

main();