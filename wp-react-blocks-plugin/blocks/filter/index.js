import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import Generic from "../icons";

registerBlockType(process.env.BLOCKS_NS+'/filter',
    {
        title: __('Data Filter'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            placeHolder:{
                type:'String',
                default:"Age Group"
            },
            type:{
                type:'String',
                default:"AgeGroup"
            },
            param:{
                type:'String',
                default:"age"
            }


        }
        ,
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
