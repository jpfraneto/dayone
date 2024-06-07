import { createSystem } from 'frog/ui'
 
export const { Box, Heading, Text, VStack, vars, Image } = createSystem({
    colors: {
      text: '#000000',
      background: '#ffffff',
      blue: '#0070f3',
      green: '#00ff00',
      red: '#ff0000',
      orange: '#ffaa00',
    },
    fonts: {
      default: [
        {
          name: 'Open Sans',
          source: 'google',
          weight: 400,
        },
        {
          name: 'Open Sans',
          source: 'google',
          weight: 600,
        },
      ],
      righteous: [
        {
          name: 'Righteous',
          source: 'google',
        },
      ],
    },
  })