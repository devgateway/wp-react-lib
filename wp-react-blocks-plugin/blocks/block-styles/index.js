import {InspectorControls,InspectorAdvancedControls} from '@wordpress/block-editor';
import {Button, ButtonGroup, Panel, PanelBody, PanelRow, ToggleControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {addFilter} from '@wordpress/hooks';
import {Fragment} from "@wordpress/element";
import {createHigherOrderComponent} from '@wordpress/compose'
import classnames from 'classnames'

const allowedBlocks = ['core/paragraph'];



const withFontSettingsClass = createHigherOrderComponent((BlockListBlock) => {


    return (props) => {
        const {
            name,
            attributes: {weight, condensed},
            setAttributes,
            isSelected,
        } = props;


        let className = props.className || ""
        if (weight!=null) {
            className = classnames(className, "has-weight-" + weight)
        }
        if (condensed==true) {
            className = classnames(className, "has-condensed-text")
        }
        return <Fragment>
            <BlockListBlock {...props} className={className}/>
        </Fragment>
    };
}, 'withClientIdClassName');


function addAttributes( settings, name ) {

    if( typeof settings.attributes !== 'undefined'   && allowedBlocks.includes( settings.name )){

        settings.attributes = Object.assign( settings.attributes, {
            weight:{
                type: 'String',
                default: null,
            },
            condensed:{
                type: 'boolean',
                default: false,
            }
        });

    }

    return settings;
}

/**
 * Add custom element class in save element.
 *
 * @param {Object} extraProps     Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */
function applyExtraClass(extraProps, blockType, attributes) {

    if ( allowedBlocks.includes( blockType.name )) {
        const {weight, condensed} = attributes;
        if (weight!=null) {
            extraProps.className = classnames(extraProps.className, "has-weight-" + weight);
        }
        if (condensed===true) {
            extraProps.className = classnames(extraProps.className, "has-condensed-text");
        }
    }

    return extraProps
}

const withAdvancedControls = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {

        const {
            name,
            attributes,
            setAttributes,
            isSelected,
        } = props;

        const {
            weight,condensed
        } = attributes;


        return (
            <Fragment>
                <BlockEdit {...props}/>
                { isSelected &&  allowedBlocks.includes( name ) &&<InspectorControls>
                    <Panel header={__("Font Settings")}>
                        <PanelBody>
                            <PanelRow>
                                <ToggleControl
                                    label="Condensed"
                                    checked={props.attributes.condensed}
                                    onChange={() => {
                                        setAttributes({condensed: !props.attributes.condensed})
                                    }}
                                />
                            </PanelRow>

                            <PanelRow>
                                <ButtonGroup>
                                    <Button isPrimary={weight == "300"}
                                            onClick={e => setAttributes({weight: "300"})}>Light</Button>
                                    <Button isPrimary={!weight || weight == "400"}
                                            onClick={e => setAttributes({weight: "400"})}>Regular</Button>
                                    <Button isPrimary={weight == "700"}
                                            onClick={e => setAttributes({weight: "700"})}>Medium</Button>
                                </ButtonGroup>
                            </PanelRow>
                        </PanelBody>
                    </Panel>
                </InspectorControls>
                }

            </Fragment>
        );
    };
}, 'withAdvancedControls');

addFilter(
    'blocks.registerBlockType',
    'dg/custom-font-setting-attributes',
    addAttributes
);
addFilter(
    'editor.BlockEdit',
    'dg/custom-font-settings',
    withAdvancedControls
);
addFilter(
    'blocks.getSaveContent.extraProps',
    'dg/applyExtraClass',
    applyExtraClass
);

addFilter('editor.BlockListBlock', 'dg/with-font-setting-class-name', withFontSettingsClass);
