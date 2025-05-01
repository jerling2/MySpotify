const main = () => {
    const linkToCode = document.getElementById('ext-link-github');
    const linkToPlaylist = document.getElementById('ext-link-spotify');
    const scrollContainer = document.getElementById('music-scroll-container');

    // Timeline animation
    const timelineContainer = document.getElementById('dynamic-timeline-container');

    const timeline = document.getElementById('timeline-title');
    const timelineRect = timeline.getBoundingClientRect();

    const timelineContainerRect = timelineContainer.getBoundingClientRect();
    const timelineAnimationStart = timelineContainerRect.left;
    const timelineAnimationEnd = timelineContainerRect.width - timelineRect.width;

    linkToCode.addEventListener('click', () =>
        redirect('https://github.com/jerling2/MySpotify')
    );

    linkToPlaylist.addEventListener('click', () => 
        redirect('https://open.spotify.com/playlist/7K2ImbL3CVtGexjq7arClB?si=9368b5e540a242e6&pt=e5f20d63cfd5b66b2b63f5e4af115d09')
    );

    scrollContainer.addEventListener('scroll', () => {
        const f = scrollProgress(scrollContainer);
        const l = lerp(
            timelineAnimationStart, 
            timelineAnimationEnd, 
            f
        );
        moveTimeline(timeline, l);
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

function moveTimeline(htmlElement, offset) {
    htmlElement.style.left = `${offset}px`;
}

main();

