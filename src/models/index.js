/**
 * ModelsJobber knows what models are Active & Valid.
 * 
 * Since instead of having direct dependencies of models, you
 * just ask ModelsJobber for some model and it gives you.
 * 
 * The storage of model data should be handled by another layers.
 * This is just for reflection
 * 
 * let trigramConstructor = Models.get('models/Trigram')
 * let myTrigram = Models.new('models/Trigram')
 */
class ModelsJobber {
    constructor( ) {
        this.clients = {}
    }

    /** Get constructor
     * 
     * Or get a new instance
     * ex: Models.new('models/Trigram', [0,0,0])
     */
    static get(modelKind) { return this.clients[modelKind] }
    get(modelKind){ return ModelsJobber.get(modelKind) }

    static new(modelKind, ...args) { return ModelsJobber.new(modelKind, ...args) }
    new(modelKind, ...args) { 
        return new ModelsJobber.get(modelKind)( ...args )
    }

    /**
     * Register a valid model 
     *  
     * @param {BaseModel} model 
     */
    register( model ) {
        debugger;
        this.clients[ model.kind() ] = model
    }
    unregister( model ) {
        this.clients[ model.kind() ] = String
        delete this.clients[ models.type() ]
    }

    /**
     * Returns a new Model of type A, given a 
     * json-like object in the format: {type: 'models/xx', data: {}}
     */
    unserialize( modelData ) {
        let kind = modelData.kind
        return Models.new( kind , modelData.data )
    }

    /** 
     * Serialize model to plain Object.
     * 
     * Inverse of unserialize
     */
    serialize() {
        return assign({kind: this.kind(), data: this.value})
    }

}

export default (new ModelsJobber())