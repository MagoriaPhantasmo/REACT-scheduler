
const termcheck = (term, selectedTerms) => {
    
    return selectedTerms.filter(s => s.term === term);
}

const daycheck = (day, selectedDays) => {
    const toCheck = day.split(/(?=[A-Z])/)
 
    return selectedDays.filter(s => toCheck.some(d => s.meets.includes(d)));
}

const padtime = (time) => {
    const added = '0'.repeat(4 - time.length);
    return added + time;
}

// st1 < en1 < st2 < en2  ##NO CONFLICT

// ST1 < ST2 < en1 < en2  ## CONFLICT

// st2 < st1 < en2 < en1 ## CONFLICT

// st2 < en2 < st1 < en1 ## NO CONFLICT

//Basically determine "first class" then determine if it ends before second's start

const timecheck = (start, end, selectedTImes) => {
    const convertedTimes = selectedTImes.map(x => {
        return x.meets.split(" ")[1].split("-")
    })
    return convertedTimes.some(t => {
        if (start === t[0] || end === t[1]){
            return true;}
        else if (t[0] < start){
            return t[1] > start;
        }
        else{
            return end >= t[0];
        }
        
    })
}

export const conflictcheck = (course, selected) => {
    const term = course.term;
    const [days, temp] = course.meets.split(" ")
    const [start, end] = temp.split("-")

    //console.log(`Class is ${term} on ${days} starting ${start} ending ${end}`);
    const termConflictors = termcheck(term, selected);
    
    const dayConflictors = daycheck(days, termConflictors);
    
    return timecheck(start, end, dayConflictors);
    
    
    
}