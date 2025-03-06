import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const AnimatedBackground = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(45deg, ${theme.palette.background.default}, ${theme.palette.grey[900]})`
    : `linear-gradient(45deg, ${theme.palette.primary.light}15, ${theme.palette.background.default})`,
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
  '@keyframes gradient': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
}));

export const ContentWrapper = styled(Box)({
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
}); 