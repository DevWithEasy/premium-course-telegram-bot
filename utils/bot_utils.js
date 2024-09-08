const startMessage=(ctx)=>{
    ctx.telegram.sendMessage(
        ctx.chat.id,
        `আমাদের বটে আপনাকে স্বাগতম।
        প্রিমিয়াম কোর্স ফ্রি বটে, আপনি পেইড এবং ফ্রি কোর্স গুলো ডাউনলোডের লিঙ্ক পাবেন।`,
        {
            reply_markup :{
                inline_keyboard : [
                    [
                        {text : 'কোর্স ক্যাটাগরি দেখুন', callback_data : 'Category'}
                    ],
                    [
                        {text : 'বট সম্পর্কে', callback_data : 'About'}
                    ]
                ]
            }
        }
    )
    
}

const helpMessage = `প্রিমিয়াম কোর্স ফ্রি বট.
বটের প্রথমে যেতে,
/start - start this bot

কোর্স ক্যাটাগরি দেখতে,
/category - courses category

কোন কোর্স খুজতে,
/courses <space> <cousrse title>
উদাহরনঃ /courses Python

হেল্প পেতে,
/help - help this bot
`

module.exports = {
    startMessage,
    helpMessage,
}