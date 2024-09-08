require('dotenv').config();
const { Telegraf } = require('telegraf');
const courses = require('./data/courses');
const { helpMessage, startMessage } = require('./utils/bot_utils');
const { getCategories, getCategoriesList } = require('./utils/courses_utils');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    startMessage(ctx);
});

bot.action('start', async (ctx) => {
    try {
        await ctx.answerCbQuery();
        await ctx.deleteMessage();
    } catch (error) {
        console.error('Failed to delete message:', error.response?.description || error.message);
    }
    startMessage(ctx);
});

bot.help((ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, helpMessage);
});

bot.command('category', (ctx) => {
    const categories = getCategories(courses);
    ctx.telegram.sendMessage(ctx.chat.id, 'Courses Categories', {
        reply_markup: {
            inline_keyboard: categories,
        },
    });
});

bot.action('Category', async (ctx) => {
    try {
        await ctx.answerCbQuery();
        await ctx.deleteMessage();
    } catch (error) {
        console.error('Failed to delete message:', error.response?.description || error.message);
    }
    ctx.telegram.sendMessage(ctx.chat.id, 'Courses Categories', {
        reply_markup: {
            inline_keyboard: getCategories(courses),
        },
    });
});

bot.action(getCategoriesList(courses), async (ctx) => {
    try {
        await ctx.answerCbQuery();
        await ctx.deleteMessage();
    } catch (error) {
        console.error('Failed to delete message:', error.response?.description || error.message);
    }

    const findCourses = courses.find((course) => course.category === ctx.match.input);

    let message = `${findCourses.courses.length} টি কোর্স খুজে পাওয়া গেছে ${ctx.match.input}.\n\n`;
    findCourses.courses.forEach((course) => {
        message += `কোর্সের নাম:\n${course.name} - কোর্সের মেন্টরঃ ${course?.source}\nডাউনলোড লিংক:\n${course.course_link}\n\n`;
    });

    ctx.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Back categories', callback_data: 'Category' }],
            ],
        },
    });
});

bot.command('course', (ctx) => {
    let inputArray = ctx.message.text.split(' ');

    if (inputArray.length === 1) {
        ctx.reply('আপনি সার্চের জন্য কিছু লিখেন নি. অনুগ্রহ করে কিছু খোঁজার এই ভাবে কিছু লিখুন  "/course [something]".');
    } else {
        inputArray.shift();
        const search = inputArray.join(' ');
        let allCourses = [];
        courses.forEach((course) => {
            allCourses = allCourses.concat(course.courses);
        });
        const findCourses = allCourses.filter((course) =>
            course.name.toLowerCase().includes(search.toLowerCase())
        );
        if (findCourses.length === 0) {
            ctx.reply('কোন কোর্স খুজে পাওয়া যায়নি। ভিন্নভাবে লিখে আবার খোঁজার চেষ্টা করুন।');
        } else {
            let message = `${findCourses.length} টি কোর্স খুজে পাওয়া গেছে আপনার '${search}' সার্চ অনুযায়ী। \n\n`;
            findCourses.forEach((course) => {
                message += `কোর্সের নাম:\n${course.name} - কোর্সের মেন্টরঃ ${course?.source}\nডাউনলোড লিংক:\n${course.course_link}\n\n`;
            });
            ctx.telegram.sendMessage(ctx.chat.id, message, {
                reply_markup: {
                    inline_keyboard: [[{ text: 'Main Menu', callback_data: 'start' }]],
                },
            });
        }
    }
});

bot.action('About', async (ctx) => {
    try {
        await ctx.answerCbQuery();
    } catch (error) {
        console.error('Failed to handle callback query:', error.response?.description || error.message);
    }
    ctx.telegram.sendMessage(ctx.chat.id, 'বট বিষয়ক তথ্য', {
        reply_markup: {
            keyboard: [
                [{ text: 'ডেভেলপার' },{ text: 'বট সম্পর্কে' }],
                [{ text: 'সংবিধিবদ্ধ সতর্কীকরণ' }],
                [{ text: 'Remove Keyboard' }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    });
});

bot.hears('ডেভেলপার', (ctx) => {
    const about = `পোর্টফালিওঃ https://devwitheasy.vercel.app
    গিঠহাবেঃ https://github.com/DevWithEasy`
    ctx.telegram.sendMessage(ctx.chat.id, about);
});

bot.hears('বট সম্পর্কে', (ctx) => {
    const about = `অনলাইনে শিখার ফ্রি এবং পেইড কোর্সের সংগ্রহশালা।`
    ctx.telegram.sendMessage(ctx.chat.id, about);
});

bot.hears('সংবিধিবদ্ধ সতর্কীকরণ', (ctx) => {
    const about = `আমরা পাইরেসি সমর্থন করিনা।
    অনলাইনে ছড়িয়ে ছিঠিয়ে থাকা বিভিন্ন বিষয়ের ফ্রি এবং পেইড কোর্সের লিঙ্কগুলো সংগ্রহ করে শেয়ার করা হয়েছে। 
    শুধু শেখার জন্য এই বটটি বানানো হয়েছে।`
    ctx.telegram.sendMessage(ctx.chat.id, about);
});

bot.hears('Remove Keyboard', (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, '', {
        reply_markup: {
            remove_keyboard: true,
        },
    });
});

bot.launch();

console.log('Bot Server running');
