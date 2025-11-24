import React from 'react';
import './GlitchImage.css';

export default function GlitchImage({ src, alt = '', speed = 0.5, enableShadows = true, enableOnHover = false, className = '', smoothMode = false }) {
  if (smoothMode) {
    return (
      <div className={`glitch-img glitch-img--static ${className}`}>
        <img src={src} className="glitch-img__base" alt={alt} loading="lazy" decoding="async" />
      </div>
    );
  }

  const inlineStyles = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-6px 0 8px rgba(233,71,245,0.75)' : 'none',
    '--before-shadow': enableShadows ? '6px 0 8px rgba(47,75,162,0.75)' : 'none'
  };

  const hoverClass = enableOnHover ? 'glitch-img--hover' : '';

  return (
    <div className={`glitch-img ${hoverClass} ${className}`} style={inlineStyles}>
      <img src={src} className="glitch-img__base" alt={alt} loading="lazy" decoding="async" />
      <img src={src} className="glitch-img__after" aria-hidden alt="" loading="lazy" decoding="async" />
      <img src={src} className="glitch-img__before" aria-hidden alt="" loading="lazy" decoding="async" />
    </div>
  );
}
