import React from 'react';
const ErrorForm = ({touched,message})=>{
    if (!touched){
        return <div>Error</div>
    }
    if (message){
        return <div>{message}</div>
    }
    return <div>All good</div>
}
export default ErrorForm;