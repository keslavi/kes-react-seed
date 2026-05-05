
/*
    1. handles real errors and stupid 200-success but it's really an error errors.
    2. displays notifications of the error.
*/

import { toast } from 'react-toastify';
import _ from 'lodash';
//import { addError } from "../";


// handle any company specific validation schemas

// potentially changing action byref
const validate = (res) => {

    //keeping as action in case of future modification
    const action = { type: '', payload: {} };
    let msg = null;
    let netDetails = null;
    let rrid = null;
    let httperrorRes = null;

    // handle network errors
    if (!res || typeof res !== 'object') {
        const error = new Error('Invalid API response');
        error.status = 0;
        message('apiError', error.message, null, 'invalid-response');
        return Promise.reject(error);
    }

    const data = res.data || {};

    if (typeof res.status !== 'number') {
        const error = new Error('Invalid API response status');
        error.status = 0;
        error.response = res;
        message('apiError', error.message, null, 'invalid-status', res);
        return Promise.reject(error);
    }

    if (res.status < 200 || res.status > 299) {
        action.type = 'apiError';
        rrid = `http ${res.status}`;
        msg = data.ErrorUIMessage;

        if (!_.isEmpty(data)) {
            httperrorRes = data;
            netDetails = data.ErrorDetails;
        }
        message(action.type, msg, netDetails, rrid, httperrorRes);
        //addErrorToStore(action.type, msg, netDetails, rrid);
        const error = new Error(msg || `HTTP ${res.status} error`);
        error.status = res.status;
        error.response = res;
        error.data = data;
        return Promise.reject(error);
    }

    // handle company specific success:false errors
    // Check if response indicates an error despite 200 status
    if (data && typeof data === 'object') {
        // Check for common error patterns in response body
        if (data.success === false || data.error || data.errors || data.message?.toLowerCase().includes('error')) {
            action.type = 'apiError';
            rrid = 'business logic error';
            msg = data.message || data.error || 'Business logic error';
            
            if (!_.isEmpty(data)) {
                httperrorRes = data;
                netDetails = data.details || data.ErrorDetails;
            }
            message(action.type, msg, netDetails, rrid, httperrorRes);
            return Promise.reject(new Error(msg || 'Business logic error'));
        }
    }

    return res;
}

function message(actionType, msg, netDetails, rrid, httperrorRes = null) {
    toast.error(
        <span>
            <div><b>Error Type:</b>{actionType}</div>
            {!_.isEmpty(msg) ? <div>{msg}</div> : ''}
            {!_.isEmpty(rrid) ? <div><br /><b>RRID: </b>{rrid}</div> : ''}
            {!_.isEmpty(netDetails) ?
                <span>
                    <div><br /><b>Details:</b></div>
                    {netDetails.split('at').map(x => (<div>{x}</div>))}
                </span> : ''}
            {!_.isEmpty(httperrorRes) ? <div><div><br /><b>Details</b></div>httperrorRes</div> : ''}
        </span>
        , {
            position: "top-center",
            className: 'toast-wide',
            autoClose: false
        });
}

export function messageHttpError(error) {
    const url = error.config?.url || 'Unknown URL';
    const method = error.config?.method || 'Unknown Method';
    const msg = error?.message || 'Request failed';
    
    // Special handling for timeout errors
    const isTimeout = error?.code === 'ECONNABORTED' || msg.toLowerCase().includes('timeout');
    const errorType = isTimeout ? 'Request Timeout' : 'HTTP Error';

    toast.error(
        <span>
            <div><b>Error Type:</b> {errorType}</div>
            <div><b>url:</b> {url}</div>
            <div><b>method:</b> {method}</div>
            {!_.isEmpty(msg) ? <div>{msg}</div> : ''}
        </span>
        , {
            position: "top-center",
            className: 'toast-wide',
            autoClose: isTimeout ? 5000 : false
        });
}

export default validate;