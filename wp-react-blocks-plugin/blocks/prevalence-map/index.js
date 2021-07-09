import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {
    getColorClassName,
    InspectorControls,
    PanelColorSettings,
    useBlockProps,
    withColors
} from '@wordpress/block-editor';
import {Panel, ResizableBox} from '@wordpress/components';
import {Generic} from "../icons";

const EditComponent = (props) => {

    const {
        backgroundColor,
        setBackgroundColor,
        toggleSelection,
        setAttributes,
        attributes: {
            width,
            height,
            alignment
        },
    } = props;

     const blockProps = useBlockProps({className: 'wp-react-component'});
    const onChangeAlignment = newAlignment => {
        props.setAttributes({alignment: newAlignment});
    };
    let divClass;
    let divStyles = {"text-align":alignment};
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
                    {/*
                    <PanelBody title="Alignment"  initialOpen={true}>
                        <PanelRow>
                            <AlignmentToolbar
                                label={"Alignment"}
                                value={alignment}
                                onChange={onChangeAlignment}
                            />
                        </PanelRow>
                    </PanelBody>
                       */}
                </Panel>
            </InspectorControls>
            <div {...blockProps} >
                <ResizableBox
                    size={{
                        height,
                        width,
                    }}
                    style={{"margin":"auto"}}
                    minHeight="50"
                    minWidth="50"
                    enable={{
                        top: false,
                        right: true,
                        bottom: true,
                        left: false,
                        topRight: false,
                        bottomRight: true,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    onResizeStop={(event, direction, elt, delta) => {
                        setAttributes({
                            height: parseInt(height + delta.height, 10),
                            width: parseInt(width + delta.width, 10),
                        });
                        toggleSelection(true);
                    }}
                    onResizeStart={() => {
                        toggleSelection(false);
                    }}
                >
                    <div className={divClass} style={{...divStyles, width, height}}>

                        <iframe  scrolling={"no"} style={{width, height}}
                                 src={process.env.EMBEDDABLE_URI+"/map"}/>
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
            <div width={width} height={height} className={"wp-react-lib-component"} data-component={"map"}></div>
        </div>


    );
}
registerBlockType(process.env.BLOCKS_NS+'/illicit-map', {
    title: __('Illicit Map'),
    icon: Generic,
    category: process.env.BLOCKS_CATEGORY,
    attributes: {
        width: {
            type: 'number',
            default: 900,
        },
        height: {
            type: 'number',
            default: 400,
        },
        backgroundColor: {
            type: 'string'
        },

    },
    edit: withColors('backgroundColor', {textColor: 'color'})(EditComponent),
    save: SaveComponent,
});
