// Desktop detection and redirection script for mobile pages
function isDesktopDevice() {
    // Check for mobile user agent
    const mobileUserAgents = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    // Check if user agent matches any mobile pattern
    const isMobileUA = mobileUserAgents.some(agent => agent.test(navigator.userAgent));

    // Check screen width (additional check for responsive design)
    const isMobileScreen = window.innerWidth <= 768;

    // Check for touch capability (mobile devices typically have touch)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Return true if it's NOT a mobile device
    return !isMobileUA && !(isMobileScreen && isTouchDevice);
}

function redirectToDesktopVersion() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop();

    // Map of mobile files to their desktop counterparts
    const desktopFileMap = {
        'index-mobile.html': 'index.html',
        'about-mobile.html': 'about.html',
        'team-mobile.html': 'team.html',
        'projects-mobile.html': 'projects.html',
        'join-individual-mobile.html': 'join-induvidual.html',
        'join-club-mobile.html': 'join-club.html',
        'join-company-mobile.html': 'join-company.html'
    };

    // Check if current file has a desktop version and redirect
    if (desktopFileMap[currentFile]) {
        window.location.href = desktopFileMap[currentFile];
    }
}

// Run desktop detection when page loads
document.addEventListener('DOMContentLoaded', function () {
    if (isDesktopDevice()) {
        redirectToDesktopVersion();
    }
});

// Also check on window resize (in case user rotates device or resizes window)
window.addEventListener('resize', function () {
    if (isDesktopDevice()) {
        redirectToDesktopVersion();
    }
}); 