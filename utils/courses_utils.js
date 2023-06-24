const getCategoriesList=(courses)=>{
    let categories=[]
    courses.forEach(course=>{
        if(!categories.includes(course.category))
        categories.push(course.category)
    })
    return categories
}

const getCategories=(courses)=>{
    let categories=[]
    courses.forEach(course=>{
        if(!categories.includes(course.category))
        categories.push(course.category)
    })
    
    let replies = []
    categories.forEach(category=>{
        replies.push(
            {text : category, callback_data : category}
        )
    })

    const newReplies = []

    replies.forEach(reply=>{
        if(newReplies.length === 0){
            newReplies.push([reply])
        }else if(newReplies[newReplies.length -1 ].length === 1){
            newReplies[newReplies.length -1 ].push(reply)
        }else if(newReplies[newReplies.length -1 ].length === 2){
            newReplies.push([reply])
        }
    })

    return [
        ...newReplies,
        [{text : 'Back Main', callback_data : 'start'}]
    ]
}

module.exports= {
    getCategoriesList,
    getCategories
}