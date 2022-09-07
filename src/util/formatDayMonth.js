
function formatDayMonth(date){
    const d=new Date(`${date}`).toDateString()
    const x=d.split(" ")
    return `${x[1]} ${x[2]}, ${x[3]}`
}

export default formatDayMonth