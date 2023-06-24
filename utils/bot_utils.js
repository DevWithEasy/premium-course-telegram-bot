const startMessage=(ctx)=>{
    ctx.telegram.sendMessage(
        ctx.chat.id,
        `Welcome to Premium Coures Bot.`,
        {
            reply_markup :{
                inline_keyboard : [
                    [
                        {text : 'Courses Category', callback_data : 'Category'}
                    ],
                    [
                        {text : 'About Bot', callback_data : 'About'}
                    ]
                ]
            }
        }
    )
    
}

const helpMessage = `Welcome to Premium Coures Bot.
/start - start this bot
/help - help this bot
/category - courses category
/source - created the course 
/courses <space> <cousrse title> - find course
`

module.exports = {
    startMessage,
    helpMessage,
}