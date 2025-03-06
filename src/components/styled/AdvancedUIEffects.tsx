import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const GlassmorphicCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
  },
}));

export const NeumorphicCard = styled(Paper)`
  background: linear-gradient(145deg, #ffffff, #f5f5f5);
  box-shadow: 8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff;
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 12px 12px 20px #d9d9d9, -12px -12px 20px #ffffff;
  }
`;

export const FloatingElement = styled(Box)`
  animation: ${floatAnimation} 3s ease-in-out infinite;
`;

export const PulsingElement = styled(Box)`
  animation: ${pulseAnimation} 2s ease-in-out infinite;
`;

export const ParallaxContainer = styled(Box)`
  perspective: 1000px;
  transform-style: preserve-3d;
`;

export const ParallaxLayer = styled(Box)<{ depth: number }>`
  transform: translateZ(${props => props.depth * 50}px) scale(${props => 1 - props.depth * 0.1});
  position: relative;
`;

export const ScrollRevealContainer = styled(Box)`
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const GradientBorder = styled(Box)`
  position: relative;
  padding: 3px;
  background: linear-gradient(45deg, #2196F3, #21CBF3);
  border-radius: 16px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    padding: 3px;
    background: linear-gradient(45deg, #2196F3, #21CBF3);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

export const InteractiveBackground = styled(Box)`
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(33, 150, 243, 0.1) 0%,
      rgba(33, 150, 243, 0) 70%
    );
    transform: translate(var(--mouse-x, 0), var(--mouse-y, 0));
    pointer-events: none;
    transition: transform 0.2s ease;
  }
`; 