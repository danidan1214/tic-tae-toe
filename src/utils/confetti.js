import confetti from 'canvas-confetti';

export const launchWinConfetti = () => {
  confetti();
};

export const launchTieConfetti = () => {
  confetti({
    colors: ['#d3d3d3', '#ffffff']
  });
};
