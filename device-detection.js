// Universal device detection and redirection script for GitHub Pages
(function () {
    'use strict';

    // Prevent infinite redirects
    let redirectAttempted = false;

    function isMobileDevice() {
        // Use orientation: if width < height, treat as mobile
        return window.innerWidth < window.innerHeight;
    }

    function isDesktopDevice() {
        return window.innerWidth >= window.innerHeight;
    }

    function getCurrentFileName() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop();

        // Handle GitHub Pages root path
        if (!fileName || fileName === '' || fileName === window.location.hostname) {
            return 'index.html';
        }

        return fileName;
    }

    function shouldRedirect() {
        // Prevent infinite redirects
        if (redirectAttempted) {
            return false;
        }

        // Check if we're in a redirect loop
        const redirectCount = sessionStorage.getItem('redirectCount') || 0;
        if (redirectCount > 2) {
            return false;
        }

        return true;
    }

    function redirectToMobileVersion() {
        if (!shouldRedirect()) return;

        const currentFile = getCurrentFileName();

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
            redirectAttempted = true;
            sessionStorage.setItem('redirectCount', (parseInt(sessionStorage.getItem('redirectCount') || 0) + 1).toString());
            window.location.href = mobileFileMap[currentFile];
        }
    }

    function redirectToDesktopVersion() {
        if (!shouldRedirect()) return;

        const currentFile = getCurrentFileName();

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
            redirectAttempted = true;
            sessionStorage.setItem('redirectCount', (parseInt(sessionStorage.getItem('redirectCount') || 0) + 1).toString());
            window.location.href = desktopFileMap[currentFile];
        }
    }

    function handleDeviceDetection() {
        // Reset redirect count for new page loads
        if (performance.navigation.type === 0) { // NavigationType.NAVIGATE
            sessionStorage.setItem('redirectCount', '0');
        }

        const currentFile = getCurrentFileName();
        const isMobile = isMobileDevice();

        // Check if current file is a mobile version
        const isMobileFile = currentFile.includes('-mobile.html');

        if (isMobile && !isMobileFile) {
            // Mobile device on desktop page - redirect to mobile
            redirectToMobileVersion();
        } else if (!isMobile && isMobileFile) {
            // Desktop device on mobile page - redirect to desktop
            redirectToDesktopVersion();
        }
    }

    // Run detection when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleDeviceDetection);
    } else {
        // DOM is already loaded
        handleDeviceDetection();
    }

    // Also check on window resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleDeviceDetection, 250);
    });

    // Handle page visibility changes (when user switches tabs/apps)
    document.addEventListener('visibilitychange', function () {
        if (!document.hidden) {
            handleDeviceDetection();
        }
    });

})(); 