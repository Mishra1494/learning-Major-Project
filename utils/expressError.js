class expressError extends Error{
    constructor(status,message){
        super();
        console.log(status ," ",message);
        this.status = status;
        this.message = message;
    }
}

module.exports = expressError;