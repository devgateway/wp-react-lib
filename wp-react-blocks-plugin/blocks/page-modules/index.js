import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {Generic} from '../icons/index.js'
import {Panel, PanelBody, PanelRow, ResizableBox, TextControl} from '@wordpress/components';
import {BlockEditWithFilters} from "../commons";

const EditComponent = (props) => {
    const {attributes: {width, height, navLabel, topTopLabel}, toggleSelection, setAttributes} = props;

    const urlParams = new URLSearchParams(window.location.search);
    const parent = urlParams.get('post');

    const blockProps = useBlockProps({className: 'wp-react-component'});
    const queryString = `editing=true&parent=${parent}&data-nav-label=${navLabel}&data-to-top-label=${topTopLabel}`;
    const divClass = ""
    const divStyles = {height: height + 'px', width: '100%'}

    return (
        <div>

            <InspectorControls>
                <Panel header={__("Configuration")}>
                    <PanelBody title={__("Labels")}>
                        <PanelRow>
                            <TextControl
                                label={__('Navigator Label')}
                                value={navLabel}
                                onChange={(navLabel) => setAttributes({navLabel})}
                            />

                        </PanelRow>

                        <PanelRow>
                            <TextControl
                                label={__('To Top Label')}
                                value={topTopLabel}
                                onChange={(topTopLabel) => setAttributes({topTopLabel})}
                            />

                        </PanelRow>
                    </PanelBody>
                </Panel>
            </InspectorControls>
            <ResizableBox
                size={{height}}
                style={{"margin": "auto", width: "100%"}}
                minHeight="200"
                minWidth="500"
                enable={{
                    top: false,
                    right: false,
                    bottom: true,
                    left: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                }}
                onResizeStop={(event, direction, elt, delta) => {
                    setAttributes({
                        height: parseInt(height + delta.height, 10),

                    });
                    toggleSelection(true);
                }}
                onResizeStart={() => {
                    toggleSelection(false);
                }}
            >

                <div  {...blockProps}>
                    <iframe
                        style={{...divStyles}} className={divClass}
                        scrolling={"no"}
                        src={props.src + queryString}/>
                </div>


            </ResizableBox>
        </div>
    );
}
const SaveComponent = (props) => {
    const {navLabel, topTopLabel} = props.attributes;
    return (<div className={"wp-react-lib-component"} data-component={"pageModules"} data-nav-label={navLabel}
                 data-to-top-label={topTopLabel}>
        </div>
    );
}

class EditWithSettings extends BlockEditWithFilters {
    render() {
        return <EditComponent
            src={this.state.react_ui_url + "/en/embeddable/pagemodules?"} {...this.props}></EditComponent>
    }
}

registerBlockType(process.env.BLOCKS_NS + '/page-modules',
    {
        title: __('Page Modules'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            count: {
                type: 'number',
                default: 3,
            },
            height: {
                type: "number",
                default: 400
            },
            width: {
                type: "number",
                default: 800
            },
            topTopLabel: {
                type: 'String',
                default: "TO THE TOP",
            },
            navLabel: {
                type: 'String',
                default: "Sections",
            }
        }
        ,
        edit: EditWithSettings,
        save: SaveComponent,
    }
)
;
