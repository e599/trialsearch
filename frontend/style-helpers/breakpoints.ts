export const phone = `@media (min-width: 425px)`
export const tablet = `@media (min-width: 768px)`
export const laptop = `@media (min-width: 1024px)`
export const desktop = `@media (min-width: 1440px)`
export const custom = (bp: number): string => `@media (min-width: ${bp}px)`
