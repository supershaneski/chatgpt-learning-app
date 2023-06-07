import { textCompletion } from '../../services/openai'

export async function POST(request) {

    const { prompt, temperature = 0.7, stop = '\n' } = await request.json()
    
    if (!prompt) {
        return new Response('Bad question', {
            status: 400,
        })
    }

    let text = ''

    try {

        text = await textCompletion({
            prompt,
            temperature,
            stop,
        })

    } catch(error) {

        console.log(error)

    }

    return new Response(JSON.stringify({
        text,
    }), {
        status: 200,
    })

}