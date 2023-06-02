const calculator = (dob) => {
    let age = 0
    if(dob){
        const dateOfBirth = new Date(dob)
        const ageDifference = Date.now() - dateOfBirth;
        const ageDate = new Date(ageDifference);
        age = Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    return age;
}

module.exports = calculator