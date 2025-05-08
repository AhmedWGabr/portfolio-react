export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, elementId: string) => {
  e.preventDefault();
  scrollToElement(elementId);
};