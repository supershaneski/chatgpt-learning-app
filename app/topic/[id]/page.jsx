import Sandbox from "./sandbox"

/*
export const metadata = {
    title: process.env.siteTitle,
    description: 'A sample React app built using Next.js powered by OpenAI Chat API.',
    viewport: 'maximum-scale=1.0, minimum-scale=1.0, initial-scale=1.0, width=device-width, user-scalable=0',
    icons: {
        icon: '/logo192.png',
        shortcut: '/logo192.png',
    }
}
*/

export async function generateMetadata({ params, searchParams }, parent) {
    
    // read route params
    //const id = params.id;

    const title = params.id === 'abc0123' ? 'CS50 Introduction to Programming with Scratch' : 'Introduction to Data Science with Python'
    const description = params.id === 'abc0123' ? 'A gentle introduction to programming that prepares you for subsequent courses in coding.' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

    return {
        title: `${title}`,
        description: description,
        viewport: 'maximum-scale=1.0, minimum-scale=1.0, initial-scale=1.0, width=device-width, user-scalable=0',
        icons: {
            icon: '/logo192.png',
            shortcut: '/logo192.png',
        }
    }
}
   
export default function Page({ params, searchParams }) {
    return <Sandbox params={params} searchParams={searchParams} />
}