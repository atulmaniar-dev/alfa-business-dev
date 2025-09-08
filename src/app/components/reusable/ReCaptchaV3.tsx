// In your ReCaptchaV3 component
'use client';
import { useEffect } from 'react';

interface Props {
  onVerify: (token: string) => void;
}

const ReCaptchaV3 = ({ onVerify }: Props) => {
  useEffect(() => {
    const loadCaptcha = () => {
      if (!window.grecaptcha) return;

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action: 'submit' })
          .then(onVerify)
          .catch(console.error);
      });

      // Hide the badge
      const style = document.createElement('style');
      style.innerHTML = '.grecaptcha-badge { visibility: hidden; }';
      document.head.appendChild(style);
    };

    if (!window.grecaptcha) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = loadCaptcha;
      document.body.appendChild(script);
    } else {
      loadCaptcha();
    }
  }, [onVerify]);

  return null;
};

export default ReCaptchaV3;