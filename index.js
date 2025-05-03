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
    placeTimestamp(scrollContainer, timelineContainer, highTimestamp, highTimestampTarget);
    const undergradTimestamp = document.getElementById('timeline-timestamp--undergrad');
    const undergradTimestampTarget = document.getElementById('timeline-timestamp--undergrad-here');
    placeTimestamp(scrollContainer, timelineContainer, undergradTimestamp, undergradTimestampTarget);
    const graduateTimestamp = document.getElementById('timeline-timestamp--graduate');
    const graduateTimestampTarget = document.getElementById('timeline-timestamp--graduate-here');
    placeTimestamp(scrollContainer, timelineContainer, graduateTimestamp, graduateTimestampTarget);


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
        translateX(timeline, offset);
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
    console.log(maxScroll);

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