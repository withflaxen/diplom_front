import {fxSignUp} from '../shared/api';

fxSignUp.doneData.watch(e=>console.log(e.message,e.statusCode));
fxSignUp.failData.watch(e=>console.log(e.errorText,e.statusCode));