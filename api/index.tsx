import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { neynar } from 'frog/hubs'
import { Box, Heading, Text, VStack, vars } from './ui.js'
import { handle } from 'frog/vercel'
import axios from 'axios'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

const POIESIS_API_KEY=process.env.POIESIS_API_KEY;

export const app = new Frog({
  ui: { vars },
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: process.env.NEYNAR_API_KEY }),
  imageOptions: {
    /* Other default options */
    fonts: [
      {
        name: 'Open Sans',
        weight: 400,
        source: 'google',
      },
      {
        name: 'Open Sans',
        weight: 700,
        source: 'google',
      },
      {
        name: 'Righteous',
        source: 'google',
      },
    ],
  },
})

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  console.log('hINSAIUSHSAS')
  return c.res({
    action: "/submit",
    image: ('https://cdn.discordapp.com/attachments/1054830741042774016/1248596476737749074/kithkui_purple_top_hats_and_enhanced_psychedelia_The_image_depi_4a07b8a8-f139-4c71-890c-d93361bdfdd3.png?ex=66643d95&is=6662ec15&hm=a5a01828455498e1d1b454162c1ce3b7c22f1dc37ffc81ad10e661602e7dc0ad&'),
    intents: [
      <TextInput placeholder="what do you want a joke about?" />,
      <Button value="dad jokes">dad joke</Button>,
    ],
  })
})

// Frame to display user's response.
app.frame('/submit', async (c) => { 
  console.log("on the submit route")

  const { buttonValue, frameData } = c
  let fid, text
  if(frameData){
    fid = frameData.fid
    text = frameData.inputText
  }
  console.log("the text is: ", text)
  const response = await axios.post('https://poiesis.anky.bot/joke', {text} ,{
    headers: {
      'Authorization': `Bearer ${POIESIS_API_KEY}`
    }
  });
  
  
  return c.res({
    image: (
      <Box
      grow
      alignHorizontal="center"
      backgroundColor="orange"
      padding="32"
      fontFamily="righteous"
    >
      <VStack gap="4">
        <Heading>{fid || "yooo"}</Heading>
        {response.data.joke.split("\n").map(line=> {
          console.log("the line is", line)
          return <Text color="text300" size="20">
          {line}
        </Text>
        })}
        
      </VStack>
    </Box>
    ),
  })
})

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
