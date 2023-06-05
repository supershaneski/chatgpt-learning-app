import { chatCompletion } from '../../services/openai'

import { isEven } from '../../lib/utils'

export async function POST(request) {

    const { system, inquiry, previous } = await request.json()
    
    if (!system) {
        return new Response('Bad question', {
            status: 400,
        })
    }

    /*if (!inquiry) {
        return new Response('Bad question', {
            status: 400,
        })
    }*/

    if (!Array.isArray(previous)) {
        return new Response('Bad chunks', {
            status: 400,
        })
    }

    let prev_data = previous

    if(prev_data.length > 20) {

        let cutoff = Math.ceil(previous.length - 20)

        cutoff = isEven(cutoff) ? cutoff : cutoff + 1

        prev_data = previous.slice(cutoff)

    }

    //console.log('count', prev_data.length)

    let text = ''

    try {

        let messages = [
            { role: 'system', content: system },
        ]

        messages = messages.concat(prev_data)
        
        if(inquiry.length > 0) {
            messages.push({ role: 'user', content: inquiry })
        }

        text = await chatCompletion({
            messages,
            temperature: 0.7,
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