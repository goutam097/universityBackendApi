
const timeConvert = (time) => {
    let fromHr = time.split(":")[0]
    const fromMin = time.split(":")[1]
    let fromM = 'AM'

    if(fromHr > 12){
      const frHr = Number(fromHr) - 12
      fromHr = frHr > 9 ? Number(fromHr) - 12 : `0${Number(fromHr) - 12}`
      fromM = 'PM'
    } else if(fromHr == 12){
      fromM = 'PM'
    }

    return `${fromHr}:${fromMin} ${fromM}`
}

module.exports = timeConvert;

  