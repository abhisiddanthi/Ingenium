// Mobile detection and redirection script
function isMobileDevice() {
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

    // Return true if any mobile indicators are present
    return isMobileUA || (isMobileScreen && isTouchDevice);
}

function redirectToMobileVersion() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop();

    // Map of desktop files to their mobile counterparts
    const mobileFileMap = {
        'index.html': 'index-mobile.html',
        'about.html': 'about-mobile.html',
        'team.html': 'team-mobile.html',
        'projects.html': 'projects-mobile.html',
        'join-induvidual.html': 'join-individual-mobile.html',
        'join-club.html': 'join-club-mobile.html',
        'join-company.html': 'join-company-mobile.html'
    };

    // Check if current file has a mobile version and redirect
    if (mobileFileMap[currentFile]) {
        window.location.href = mobileFileMap[currentFile];
    }
}

// Run mobile detection when page loads
document.addEventListener('DOMContentLoaded', function () {
    if (isMobileDevice()) {
        redirectToMobileVersion();
    }
});

// Also check on window resize (in case user rotates device or resizes window)
window.addEventListener('resize', function () {
    if (isMobileDevice()) {
        redirectToMobileVersion();
    }
}); 