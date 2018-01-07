import { assign , cloneDeep } from 'lodash'


/**
 * Base Model class, useful to store data that should be serialized.
 * 
 * Has a Kind ID, for identification of model category
 *   
 */
export class BaseModel {
    
    /* Kind ID, identification of model category */
    static kind() { return 'models/Base' }
    kind() { return this.constructor.kind() }

    /* Default object data for a Empty Model */
    default() { return {} }
    
    constructor( data ) {
        if(data){ this.value = data }
        else {
            this.value = this.default()
        }
    }

    /* Value means the data */
    get value() { return this.data }
    set value(b) { 
        this.data = assign(this.data, b) 
        return this.data 
    }

    clone(){ return cloneDeep(this)}
}