import React, { forwardRef } from 'react';
import { ImageProps } from 'react-bootstrap';
import logo from './logo.svg';
import { css, keyframes } from '@emotion/react';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Logo = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // const animation = prefersReducedMotion
  //   ? undefined
  //   : css`${spin} infinite 20s linear`;

  return (
    <img
      src={logo}
      ref={ref}
      // style={{ animation }}
      {...props}
      className="img-fluid"
    />
  );
});
