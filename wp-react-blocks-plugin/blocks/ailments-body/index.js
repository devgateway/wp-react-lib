import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {
    getColorClassName,
    InspectorControls,
    PanelColorSettings,
    useBlockProps,
    withColors
} from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, ResizableBox, TextControl} from '@wordpress/components';
import {Generic} from '../icons/index.js'
import {BlockEditWithFilters} from "../commons";

const EditComponent = (props) => {

    const {
        backgroundColor,
        setBackgroundColor,
        toggleSelection,
        setAttributes,
        attributes: {
            height,
            alignment
        },
    } = props;

    const blockProps = useBlockProps({className: 'wp-react-component'});
    const onChangeAlignment = newAlignment => {
        props.setAttributes({alignment: newAlignment});
    };
    let divClass;
    let divStyles = {"text-align": alignment, width: "100%", height: height + "px"};
    if (backgroundColor != undefined) {
        if (backgroundColor.class != undefined) {
            divClass = backgroundColor.class;
        } else {
            divStyles['background-color'] = backgroundColor.color;
        }
    }

    return (
        <div>
            <InspectorControls>
                <Panel header="Block Settings">
                    <PanelBody title={__("Size")}>
                        <PanelRow>
                            <TextControl
                                size={10}
                                label="Height"
                                value={height}
                                onChange={(height) => setAttributes({height: height ? parseInt(height) : 0})}
                            />
                        </PanelRow>
                    </PanelBody>
                    <PanelColorSettings
                        title={__('Color settings')}
                        colorSettings={[
                            {
                                value: backgroundColor.color,
                                onChange: setBackgroundColor,
                                label: __('Background color')
                            },
                        ]}
                    />

                </Panel>
            </InspectorControls>
            <div {...blockProps} >
                <ResizableBox
                    size={{
                        height
                    }}
                    style={{"margin": "auto", width: "100%"}}
                    minHeight="50"
                    minWidth="50"
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
                            height: parseInt(height + delta.height, 10)
                        });
                        toggleSelection(true);
                    }}
                    onResizeStart={() => {
                        toggleSelection(false);
                    }}
                >
                    <div className={divClass} style={divStyles}>

                        <iframe scrolling={"no"} style={divStyles}
                                src={props.src}/>
                    </div>
                </ResizableBox>
            </div>

        </div>
    );
}
const SaveComponent = (props) => {
    const {setAttributes} = props;
    const {
        width,
        height,
        customBackgroundColor,
        backgroundColor,
    } = props.attributes;

    const divClass = getColorClassName('background-color', backgroundColor);
    const divStyles = {width, height, "background-color": customBackgroundColor};

    return (<div className={divClass} style={divStyles}>
            <div width={width} height={height} className={"wp-react-lib-component"} data-component={"body"}></div>
        </div>


    );
}

class EditWithSettings extends BlockEditWithFilters {
    render() {
        return <EditComponent src={this.state.react_ui_url + "/en/embeddable/body?"} {...this.props}></EditComponent>
    }
}


registerBlockType(process.env.BLOCKS_NS + '/ailments', {
    title: __('Ailments Body'),
    icon: Generic,
    category: process.env.BLOCKS_CATEGORY,
    attributes: {
        width: {
            type: 'number',
            default: 1200,
        },
        height: {
            type: 'number',
            default: 400,
        },
        backgroundColor: {
            type: 'string'
        },

    },
    edit: withColors('backgroundColor', {textColor: 'color'})(EditWithSettings),
    save: SaveComponent,
});
