import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Chart} from '../icons/index.js'

registerBlockType(process.env.BLOCKS_NS+'/chart',
    {
        title: __('Data Chart'),
        icon: Chart,
        category: process.env.BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            height: {
                type: 'number',
                default: 500,
            },

            type: {
                type: 'string',
                default: "bar",
            },
            source: {
                type: 'string',
                default: 'gender/smoke',
            },
            bottomLegend: {
                type: 'string',
                default: "Bottom Legends",
            }
            ,
            leftLegend: {
                type: 'string',
                default: "Left Legends",
            },
            scheme: {
                type: 'string',
                default: 'nivo'
            },

            colorBy: {
                type: 'String',
                default: 'index'
            },
            prevalenceLevel1: {
                type: 'String',
                default: 'gender'
            },

            prevalenceLevel2: {
                type: 'String',
                default: 'race'
            },

            prevalenceLevel3: {
                type: 'String',
                default: 'smoke'
            },
            policyLevel1: {
                type: 'String',
                default: 'year'
            },
            groupMode: {
                type: 'String',
                default: 'grouped',
            },
            mode: {
                type: 'String',
                default: "chart"
            },


            dualMode: {
                type: "Boolean",
                default: false
            },
            toggleInfoLabel: {
                type: 'String',
                default: "Info Graphic"
            },
            toggleChartLabel: {
                type: 'String',
                default: "Chart"
            },
            dataSourceLabel: {
                type: 'String',
                default: "Source"
            },
            dataSource: {
                type: 'String',
                default: "NIDS"
            },

            legendPosition: {
                type: 'String',
                default: "right"
            },
            legendsWidth: {
                type: 'mumeric',
                default: 100
            },
            showLegends: {
                type: 'boolean',
                default: true
            },
            app: {
                type: 'String',
                default: "prevalence"
            },
            params: {
                type: Object,
                default: {}
            },
            format: {
                type: Object,
                default: {"style": "percent", "minimumFractionDigits": 1, "maximumFractionDigits": 1}
            },
            tickRotation: {
                type: 'mumeric',
                default: 0
            },
            tickColor: {
                type: "String",
                default: "rgb(0,0,0)"
            },
            keys: {
                type: "Array",
                default: []
            },
            formatStyle: {
                type: "String",
                default: "Percent"
            }
            ,
            decimalPoints: {
                type: "Numeric",
                default: 2
            }
            ,
            currency: {
                type: "String",
                default: ""
            }
            ,
            yearFilter: {
                type: "String",
                default: ""
            }
            ,

        }
        ,
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
