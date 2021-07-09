import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from '../icons'

registerBlockType(process.env.BLOCKS_NS + '/download',
    {
        title: __('Download', 'wp-react-lib-components'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            defaultFormat: {
                type: 'string',
                default: 'PNG'
            },
            title: {
                type: 'string',
                default: "Set your chart download file type"
            },


            buttonLabel: {
                type: 'string',
                default: "Download"
            },
            pngLabel: {
                type: 'string',
                default: 'export.png'
            },
            jpgLabel: {
                type: 'string',
                default: 'export.jpg'
            },
            pngText: {
                type: 'string',
                default: 'Download PNG'
            },
            jpgText: {
                type: 'string',
                default: 'Download JPG'
            },
            checkPng: {
                type: 'boolean',
                default: true
            },
            checkJpg: {
                type: 'boolean',
                default: true
            },
            height: {
                type: 'number',
                default: 200,
            }


        }
        ,
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
