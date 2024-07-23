export const getErrorMessages = (error) => {
    let message;
    if (error instanceof Error){
        message = Error.message
    } else if (error && typeof error === "object" && "message" in error){
        message = String(error?.message)
    }
    else if ( typeof error === "string"){
        message = error;
    }
    else{
        message = "Something went wrong"
    }
    return message;
}