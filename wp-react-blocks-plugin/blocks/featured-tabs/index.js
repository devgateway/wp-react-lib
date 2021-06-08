import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from '../icons'

registerBlockType(process.env.BLOCKS_NS+'/featured-tabs',
    {
        title: __('Featured Tabs'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            count: {
                type: 'number',
                default: 3,
            },
            type: {
                type: 'string',
                default: "posts",
            },
            taxonomy: {
                type: 'string',
                default: "none",
            },
            categories: {
                type: 'array',
                default: [],
            },
            height: {
                type: 'number',
                default: 500,
            },
            readMoreLabel:{
                type:"String",
                default:"READ More"
            },
            colors: {
                type: "object",
                default: {color_0: '#FFFF', color_1: '#FFFF', color_2: '#FFFF'}
            }


        }
        ,
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
