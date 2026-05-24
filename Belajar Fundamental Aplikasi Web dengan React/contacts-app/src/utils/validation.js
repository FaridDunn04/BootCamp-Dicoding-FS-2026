export function validateProps(schema,props,componentName){

    if(!import.meta.env.DEV) return props;
    
    const validateResult=schema.validate(props, {abortEarly:false});

    if(validateResult.error){
        const {details}=validateResult.error;
        details.forEach((error)=>{
            console.warn(`[${componentName}] validation Error : ${error.message}`);
        });
    }

    return validateResult.value;
}

