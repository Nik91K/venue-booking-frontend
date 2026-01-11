export const numToStars = (stars: number): number[] => {
  const star: number[] = [];

  for (let i = 0; i < stars; i++) {
    star.push(i);
  }

  return star;
};
