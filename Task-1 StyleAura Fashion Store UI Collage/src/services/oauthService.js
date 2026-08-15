// OAuth Authentication Service for Google, Facebook, and Apple

const getRedirectUri = () => `${window.location.origin}/login`;

export const oauthService = {
  getGoogleAuthUrl() {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
    if (!clientId) return null;
    const redirectUri = encodeURIComponent(getRedirectUri());
    const scope = encodeURIComponent('email profile');
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
  },

  getFacebookAuthUrl() {
    const appId = import.meta.env.VITE_FACEBOOK_APP_ID || '';
    if (!appId) return null;
    const redirectUri = encodeURIComponent(getRedirectUri());
    const scope = encodeURIComponent('email');
    return `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
  },

  getAppleAuthUrl() {
    const clientId = import.meta.env.VITE_APPLE_CLIENT_ID || '';
    if (!clientId) return null;
    const redirectUri = encodeURIComponent(getRedirectUri());
    const scope = encodeURIComponent('name email');
    return `https://appleid.apple.com/auth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&response_mode=fragment&scope=${scope}`;
  },

  openOAuthPopup(provider) {
    let authUrl = null;
    let providerName = '';

    if (provider === 'google') {
      providerName = 'Google';
      authUrl = this.getGoogleAuthUrl();
    } else if (provider === 'facebook') {
      providerName = 'Facebook';
      authUrl = this.getFacebookAuthUrl();
    } else if (provider === 'apple') {
      providerName = 'Apple';
      authUrl = this.getAppleAuthUrl();
    }

    const width = 520;
    const height = 630;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    if (!authUrl) {
      // Direct provider OAuth login URL endpoint
      const defaultEndpoint =
        provider === 'google'
          ? 'https://accounts.google.com/o/oauth2/v2/auth'
          : provider === 'facebook'
          ? 'https://www.facebook.com/v18.0/dialog/oauth'
          : 'https://appleid.apple.com/auth/authorize';

      let popup = null;
      try {
        popup = window.open(
          defaultEndpoint,
          `${providerName}_OAuth`,
          `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
        );
      } catch (err) {
        console.warn('Popup initialization error:', err);
      }

      return {
        success: false,
        configured: false,
        provider: providerName,
        popup,
        error: `Please configure VITE_${provider.toUpperCase()}_CLIENT_ID in your .env file to complete live ${providerName} OAuth sign-in.`,
      };
    }

    try {
      const popup = window.open(
        authUrl,
        `${providerName}_OAuth`,
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
      );

      if (!popup) {
        return {
          success: false,
          configured: true,
          provider: providerName,
          error: 'Popup window was blocked by your browser. Please allow popups for StyleAura.',
        };
      }

      return {
        success: true,
        configured: true,
        provider: providerName,
        popup,
      };
    } catch (e) {
      return {
        success: false,
        configured: true,
        provider: providerName,
        error: e.message || `Failed to open ${providerName} OAuth window.`,
      };
    }
  },
};
