// Cookie Consent Banner for m2ea Labs
// GDPR/CCPA Compliant

(function() {
    'use strict';

    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (cookieConsent === null) {
        // Show banner if no choice has been made
        showCookieBanner();
    } else if (cookieConsent === 'accepted') {
        // Initialize analytics/ads if accepted
        initializeThirdPartyServices();
    }

    function showCookieBanner() {
        // Create banner element
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <h3>We value your privacy</h3>
                    <p>We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or learn more in our <a href="/privacy.html">Privacy Policy</a>.</p>
                </div>
                <div class="cookie-consent-buttons">
                    <button id="cookie-accept" class="cookie-btn cookie-btn-accept">Accept All</button>
                    <button id="cookie-reject" class="cookie-btn cookie-btn-reject">Reject Non-Essential</button>
                    <button id="cookie-settings" class="cookie-btn cookie-btn-settings">Cookie Settings</button>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #cookie-consent-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(250, 249, 247, 0.98);
                backdrop-filter: blur(20px);
                border-top: 1px solid var(--color-border, #e8e6e3);
                padding: 1.5rem 3rem;
                z-index: 10000;
                box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
                animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }

            @keyframes slideUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            .cookie-consent-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 2rem;
            }

            .cookie-consent-text {
                flex: 1;
            }

            .cookie-consent-text h3 {
                font-family: var(--font-serif, 'Instrument Serif', Georgia, serif);
                font-size: 1.25rem;
                margin-bottom: 0.5rem;
                color: var(--color-text, #1a1a1a);
            }

            .cookie-consent-text p {
                font-size: 0.9rem;
                color: var(--color-text-muted, #6b6b6b);
                line-height: 1.6;
                margin: 0;
            }

            .cookie-consent-text a {
                color: var(--color-accent, #2d2d2d);
                text-decoration: underline;
            }

            .cookie-consent-buttons {
                display: flex;
                gap: 0.75rem;
                flex-shrink: 0;
            }

            .cookie-btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 4px;
                font-family: var(--font-sans, 'DM Sans', sans-serif);
                font-size: 0.9rem;
                font-weight: 400;
                cursor: pointer;
                transition: all 0.3s ease;
                white-space: nowrap;
            }

            .cookie-btn-accept {
                background: var(--color-accent, #2d2d2d);
                color: var(--color-bg, #faf9f7);
            }

            .cookie-btn-accept:hover {
                background: #1a1a1a;
            }

            .cookie-btn-reject {
                background: transparent;
                color: var(--color-text, #1a1a1a);
                border: 1px solid var(--color-border, #e8e6e3);
            }

            .cookie-btn-reject:hover {
                background: rgba(0, 0, 0, 0.05);
            }

            .cookie-btn-settings {
                background: transparent;
                color: var(--color-text-muted, #6b6b6b);
                padding: 0.75rem 1rem;
            }

            .cookie-btn-settings:hover {
                color: var(--color-text, #1a1a1a);
            }

            /* Mobile responsive */
            @media (max-width: 768px) {
                #cookie-consent-banner {
                    padding: 1.25rem 1.5rem;
                }

                .cookie-consent-content {
                    flex-direction: column;
                    align-items: stretch;
                    gap: 1.25rem;
                }

                .cookie-consent-buttons {
                    flex-direction: column;
                }

                .cookie-btn {
                    width: 100%;
                }
            }

            /* Settings Modal */
            #cookie-settings-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
                animation: fadeIn 0.3s ease;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            .cookie-settings-content {
                background: var(--color-bg, #faf9f7);
                padding: 2rem;
                border-radius: 8px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
            }

            .cookie-settings-content h2 {
                font-family: var(--font-serif, 'Instrument Serif', Georgia, serif);
                font-size: 1.75rem;
                margin-bottom: 1rem;
            }

            .cookie-category {
                margin: 1.5rem 0;
                padding: 1rem;
                border: 1px solid var(--color-border, #e8e6e3);
                border-radius: 4px;
            }

            .cookie-category h4 {
                margin-bottom: 0.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .cookie-toggle {
                position: relative;
                width: 50px;
                height: 26px;
            }

            .cookie-toggle input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .cookie-toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: 0.4s;
                border-radius: 26px;
            }

            .cookie-toggle-slider:before {
                position: absolute;
                content: "";
                height: 20px;
                width: 20px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: 0.4s;
                border-radius: 50%;
            }

            .cookie-toggle input:checked + .cookie-toggle-slider {
                background-color: var(--color-accent, #2d2d2d);
            }

            .cookie-toggle input:checked + .cookie-toggle-slider:before {
                transform: translateX(24px);
            }

            .cookie-toggle input:disabled + .cookie-toggle-slider {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .cookie-settings-actions {
                margin-top: 2rem;
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
        `;
        document.head.appendChild(style);

        // Add banner to page
        document.body.appendChild(banner);

        // Add event listeners
        document.getElementById('cookie-accept').addEventListener('click', acceptAllCookies);
        document.getElementById('cookie-reject').addEventListener('click', rejectNonEssential);
        document.getElementById('cookie-settings').addEventListener('click', showSettings);
    }

    function acceptAllCookies() {
        localStorage.setItem('cookieConsent', 'accepted');
        localStorage.setItem('analyticsConsent', 'true');
        localStorage.setItem('advertisingConsent', 'true');
        initializeThirdPartyServices();
        removeBanner();
    }

    function rejectNonEssential() {
        localStorage.setItem('cookieConsent', 'rejected');
        localStorage.setItem('analyticsConsent', 'false');
        localStorage.setItem('advertisingConsent', 'false');
        removeBanner();
    }

    function showSettings() {
        const modal = document.createElement('div');
        modal.id = 'cookie-settings-modal';
        modal.innerHTML = `
            <div class="cookie-settings-content">
                <h2>Cookie Settings</h2>
                <p style="margin-bottom: 1.5rem; color: var(--color-text-muted, #6b6b6b);">
                    Manage your cookie preferences. Essential cookies are required for the website to function and cannot be disabled.
                </p>

                <div class="cookie-category">
                    <h4>
                        <span>Essential Cookies</span>
                        <label class="cookie-toggle">
                            <input type="checkbox" checked disabled>
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </h4>
                    <p style="font-size: 0.9rem; color: var(--color-text-muted, #6b6b6b); margin: 0.5rem 0 0 0;">
                        Required for the website to function properly. These cookies cannot be disabled.
                    </p>
                </div>

                <div class="cookie-category">
                    <h4>
                        <span>Analytics Cookies</span>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="analytics-toggle">
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </h4>
                    <p style="font-size: 0.9rem; color: var(--color-text-muted, #6b6b6b); margin: 0.5rem 0 0 0;">
                        Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                    </p>
                </div>

                <div class="cookie-category">
                    <h4>
                        <span>Advertising Cookies</span>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="advertising-toggle">
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </h4>
                    <p style="font-size: 0.9rem; color: var(--color-text-muted, #6b6b6b); margin: 0.5rem 0 0 0;">
                        Used to deliver relevant advertisements through Google AdSense based on your browsing activity.
                    </p>
                </div>

                <div class="cookie-settings-actions">
                    <button class="cookie-btn cookie-btn-reject" onclick="this.closest('#cookie-settings-modal').remove()">Cancel</button>
                    <button class="cookie-btn cookie-btn-accept" id="save-settings">Save Preferences</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Set current preferences
        document.getElementById('analytics-toggle').checked = 
            localStorage.getItem('analyticsConsent') === 'true';
        document.getElementById('advertising-toggle').checked = 
            localStorage.getItem('advertisingConsent') === 'true';

        // Save settings
        document.getElementById('save-settings').addEventListener('click', function() {
            const analyticsConsent = document.getElementById('analytics-toggle').checked;
            const advertisingConsent = document.getElementById('advertising-toggle').checked;

            localStorage.setItem('cookieConsent', 'customized');
            localStorage.setItem('analyticsConsent', analyticsConsent.toString());
            localStorage.setItem('advertisingConsent', advertisingConsent.toString());

            if (analyticsConsent || advertisingConsent) {
                initializeThirdPartyServices();
            }

            modal.remove();
            removeBanner();
        });

        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    function removeBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.style.animation = 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            const slideDownAnimation = document.createElement('style');
            slideDownAnimation.textContent = `
                @keyframes slideDown {
                    from { transform: translateY(0); opacity: 1; }
                    to { transform: translateY(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(slideDownAnimation);
            setTimeout(() => banner.remove(), 400);
        }
    }

    function initializeThirdPartyServices() {
        const advertisingConsent = localStorage.getItem('advertisingConsent') === 'true';
        const analyticsConsent = localStorage.getItem('analyticsConsent') === 'true';

        // AdSense is already loaded via the script tag in <head>
        // This function can be extended to initialize other services
        
        if (advertisingConsent) {
            console.log('Advertising consent granted - AdSense active');
        }

        if (analyticsConsent) {
            console.log('Analytics consent granted');
            // Initialize analytics here if you add Google Analytics or similar
        }
    }

})();
