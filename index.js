require('dotenv').config()

const express = require('express')
const app = express()

const {Telegraf} = require('telegraf')
const courses = require('./data/courses')
const { helpMessage, startMessage } = require('./utils/bot_utils')
const { getCategories, getCategoriesList } = require('./utils/courses_utils')

const bot = new Telegraf(process.env.BOT_TOKEN)


bot.start((ctx) => {
    startMessage(ctx)
})

bot.action('start', (ctx) => {
    ctx.answerCbQuery()
    ctx.deleteMessage()
    startMessage(ctx)
})

bot.help((ctx) => {
    ctx.telegram.sendMessage(
        ctx.chat.id,
        helpMessage
    )
})

bot.command('category', (ctx) => {
    ctx.telegram.sendMessage(
        ctx.chat.id,
        'Courses Categories',
        {
            reply_markup: {
                inline_keyboard: getCategories(courses)
            }
        }
    )
})

bot.action('Category', (ctx) => {
    ctx.answerCbQuery()
    ctx.deleteMessage()
    ctx.telegram.sendMessage(
        ctx.chat.id,
        'Courses Categories',
        {
            reply_markup: {
                inline_keyboard: getCategories(courses)
            }
        }
    )
})

bot.action(getCategoriesList(courses), (ctx) => {
    ctx.answerCbQuery()
    ctx.deleteMessage()

    const findCourses = courses.filter(course => course.category === ctx.match.input)

    let message =`We found ${findCourses.length} courses of ${ctx.match.input}.\n\n`

    findCourses.forEach((course,i) => {
        message += `Course name :\n${course.name} - By ${course?.source}\nDownload Link :\n${course.course_link}\n\n`
    })
    
    ctx.telegram.sendMessage(
        ctx.chat.id,
        message,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'Back categories', callback_data: 'Category'}
                    ]
                ]
            }
        }
    )
})

bot.command('course', (ctx) => {
    let inputArray
    inputArray = ctx.message.text.split(' ')

    let search

    if(inputArray.length === 1) {
        ctx.reply('You can not type any seach. Please Type "/course something"')
    }else{
        inputArray.shift()
        search = inputArray.join(" ")
        const findCourses = courses.filter(course => course.name.toLowerCase().includes(search.toLowerCase()))
        if(findCourses.length === 0) {
            ctx.reply('No results found')
        }else{
            let message =`We found ${findCourses.length} courses by the search '${search}'.\n\n`

            findCourses.forEach((course,i) => {
                message += `Course name :\n${course.name} - By ${course?.source}\nDownload Link :\n${course.course_link}\n\n`
            })
            
            ctx.telegram.sendMessage(
                ctx.chat.id,
                message,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {text: 'Main Menu', callback_data: 'start'}
                            ]
                        ]
                    }
                }
            )
        }
    }

    
})

bot.action('About',(ctx)=>{
    ctx.answerCbQuery()
    ctx.telegram.sendMessage(
        ctx.chat.id,
        'About',
        {
            reply_markup: {
                keyboard: [
                    [
                        {text: 'Terms and Conditions'},
                        {text: 'Data Source'}
                    ],
                    [
                        {text: 'About Developers'},
                        {text: 'About Bot'}
                    ],
                    [
                        {text: 'Remove Keyboard'},
                    ]
                ],
                resize_keyboard: true,
                one_time_keyboard : true,
            }
        }
    )
})

bot.hears('Terms and Conditions',(ctx)=>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(
        ctx.chat.id,
        `Terms and Conditions\n`
    )
})

bot.hears('Data Source',(ctx)=>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(
        ctx.chat.id,
        ''
    )
})

bot.hears('About Developers',(ctx)=>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(
        ctx.chat.id,
        ''
    )
})

bot.hears('About Bot',(ctx)=>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(
        ctx.chat.id,
        ''
    )
})

bot.hears('Remove Keyboard',(ctx)=>{
    ctx.deleteMessage()
    bot.telegram.sendMessage(
        ctx.chat.id,
        'Keyboard Remove',
        {
            reply_markup : {
                remove_keyboard : true
            }
        }
    )
})

bot.launch()

app.get('/',(req,res)=>{
    res.send('Premium Course Free Bot Running')
})

app.listen(process.env.PORT || 3000,()=>{
    console.log('Bot Server running')
})