const course_apps = require("./course_apps");
const course_carrer = require("./course_carrer");
const course_education = require("./course_education");
const course_ethhacking = require("./course_ethhacking");
const course_graphics = require("./course_graphics");
const course_hacking = require("./course_hacking");
const course_marketing = require("./course_marketing");
const course_programming = require("./course_programming");
const course_seo = require("./course_seo");
const course_typography = require("./course_typography");
const course_videoedit = require("./course_videoedit");
const course_web = require("./course_web");

const courses = [
    {
        category : 'ওয়েব ডেভেলপমেন্ট',
        courses : [...course_web]
    },
    {
        category : 'ক্যারিয়ার গাইডলাইন',
        courses : [...course_carrer]
    },
    {
        category : 'ডিজিতাল মার্কেটিং',
        courses : [...course_marketing]
    },
    {
        category : 'গ্রাফিক্স ডিজাইন',
        courses : [...course_graphics]
    },
    {
        category : 'প্রোগামিং',
        courses : [...course_programming]
    },
    {
        category : 'ভিডিও ইডিটিং',
        courses : [...course_videoedit]
    },
    {
        category : 'টাইপোগ্রাফি',
        courses : [...course_typography]
    },
    {
        category : 'এপস ডেভেলপমেন্ট',
        courses : [...course_apps]
    },
    {
        category : 'হ্যাকিং',
        courses : [...course_hacking]
    },
    {
        category : 'ইথিক্যাল হ্যাকিং',
        courses : [...course_ethhacking]
    },
    {
        category : 'এস.ই.ও (SEO)',
        courses : [...course_seo]
    },
    {
        category : 'শিক্ষা বিষয়ক',
        courses : [...course_education]
    }
]

module.exports = courses;