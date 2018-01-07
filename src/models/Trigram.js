import { clone } from 'lodash'

import { BaseModel } from './base'

export class TrigramModel extends BaseModel {
    static kind() { return 'model/Trigram' }
    default() { return {
            trigrams: [NaN,NaN,NaN],
            image: '🌍',
            image_name: ':bug',
            structure: 'Bug',
            motivation: 'Desesperation',
            name: 'bug',
            body: 'brain',
            animal: '🐄',
            animal_name: ':cow2',
            wilhelm: 'Air'        
        }
    }
};

export class HexagramModel extends BaseModel {
    static kind() { return 'model/Hexagram' }
    default() { return {
            "number": 0,
            "name": "None",
            "description": "NOT_IMPL",
            "trigrams": {
                "above": {
                    "title": "true",
                    "description": "1, TRUE"
                },
                "below": {
                    "title": "false",
                    "description": "0, FALSE"
                }
            },
            "interpretation": {
                "oracle": "",
                "resume": "",
                "judgment": "",
                "image": {
                  "oracle": "",
                  "image": ""
                },
                "lines": [
                    {
                        "poem": "Nine at the beginning means:\nHidden dragon. Do not act.",
                        "expl": "In China the dragon has a meaning altogether different from that given it in the Western world. The dragon is a symbol of the electrically charged, dynamic, arousing force that manifests itself in the thunderstorm. In winter this energy withdraws into the earth; in the early summer it becomes active again, appearing in the sky as thunder and lightning. As a result the creative forces on earth begin to stir again.  Here this creative force is still hidden beneath the earth and therefore has no effect. In terms of human affairs, this symbolizes a great man who is still unrecognized. Nonetheless he remains true to himself. He does not allow himself to be influenced by outward success or failure, but confident in his strength, he bides his time. Hence it is wise for the man who consults the oracle and draws this line to wait in the calm strength of patience. The time will fulfill itself.  One need not fear least strong will should not prevail; the main thing is not to expend one's powers prematurely in an attempt to obtain by force something for which the time is not yet ripe."
                    },
                ]
            }
        }
    }
}


export class KuasModel extends BaseModel {
    /** 3 kuas group */
    static kind() { return 'model/Kuas' }
    
    default() { return [0,0,0] }
}
