const main = () => {
    const linkToCode = document.getElementById('ext-link-github');
    const linkToPlaylist = document.getElementById('ext-link-spotify');
    const scrollContainer = document.getElementById('music-scroll-container');
    
    linkToCode.addEventListener('click', () =>
        redirect('https://github.com/jerling2/MySpotify')
    );

    linkToPlaylist.addEventListener('click', () => 
        redirect('https://open.spotify.com/playlist/7K2ImbL3CVtGexjq7arClB?si=9368b5e540a242e6&pt=e5f20d63cfd5b66b2b63f5e4af115d09')
    );

    scrollContainer.addEventListener('scroll', () => console.log(scrollProgress(scrollContainer)));
}

function scrollProgress(htmlElement) {
    const maxScroll = htmlElement.scrollHeight - htmlElement.clientHeight;
    const numScroll =  htmlElement.scrollTop / maxScroll;
    return Math.round(numScroll * 100) / 100;
}

function redirect(url) {
    window.location.href = url;
}

main();

