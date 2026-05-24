function checkGrades(grades){
    for(let i=0;i<grades.length;i++){
        if(typeof grades[i] !== 'number'){
            throw new Error('Invalid Inpur');
        }

        const grade=grades[i];
        let predicate;

        if (grade >= 90) {
            predicate = 'A';
        } else if (grade >= 80) {
            predicate = 'B';
        } else if (grade >= 70) {
            predicate = 'C';
        } else if (grade >= 60) {
            predicate = 'D';
        } else {
            predicate = 'E';
        }

        console.log(`Grade${i+1} : ${grade} (${predicate})`);
    }

   
}

 try{
    const studenGardes=[95,85,65,80,70];
    checkGrades(studenGardes);
}catch(e){
    console.error(e);
}