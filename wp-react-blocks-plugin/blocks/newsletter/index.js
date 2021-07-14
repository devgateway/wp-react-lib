import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {
    getColorClassName,
    InspectorControls,
    PanelColorSettings,
    useBlockProps,
    withColors
} from '@wordpress/block-editor';
import {Generic} from '../icons/index.js'
import {Panel, PanelBody, PanelRow, TextControl} from '@wordpress/components';
import {BlockEditWithFilters} from "../commons";

const EditComponent = (props) => {
    const {
        backgroundColor,
        setBackgroundColor,
        attributes: {
            label,
            placeholder,
            successMessage,
            failureMessage,
            alignment,
            list
        },
    } = props;


    const onChangeAlignment = newAlignment => {
        props.setAttributes({alignment: newAlignment});
    };
    let divClass;
    let divStyles = {"text-align": alignment, "margin": 'auto'};
    if (backgroundColor != undefined) {
        if (backgroundColor.class != undefined) {
            divClass = backgroundColor.class;
        } else {
            divStyles['background-color'] = backgroundColor.color;
        }
    }

    const blockProps = useBlockProps(
        {
            style: divStyles,
            className: divClass
        }
    );


    const queryString = `editing=true&label=${label}&placeholder=${placeholder}&successmessage=${successMessage}&failuremessage=${failureMessage}&alignment=${alignment}`;

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

                    <PanelRow>
                        <PanelBody>
                            <TextControl
                                value={list}
                                onChange={(list) => props.setAttributes({list})}
                                label={"Mailchimp list id"}/>
                        </PanelBody>
                    </PanelRow>

                    <PanelRow>
                        <PanelBody>
                            <TextControl
                                value={placeholder}
                                onChange={(placeholder) => props.setAttributes({placeholder})}
                                label={"Input Placeholder"}/>
                        </PanelBody>
                    </PanelRow>

                    <PanelRow>
                        <PanelBody>
                            <TextControl
                                value={label}
                                onChange={(label) => props.setAttributes({label})}
                                label={"Submit Label"}/>
                        </PanelBody>
                    </PanelRow>
                    <PanelRow>
                        <PanelBody>
                            <TextControl

                                value={successMessage}
                                onChange={(successMessage) => props.setAttributes({successMessage: successMessage})}
                                label={"Success Message"}/>
                        </PanelBody>
                    </PanelRow>
                    <PanelRow>
                        <PanelBody>
                            <TextControl
                                value={failureMessage}
                                onChange={(failureMessage) => props.setAttributes({failureMessage: failureMessage})}
                                label={"Failure Message "}/>
                        </PanelBody>
                    </PanelRow>
                </Panel>
            </InspectorControls>
            <div {...blockProps}  >
                <iframe scrolling={"no"}
                        src={props.src + queryString}/>

            </div>

        </div>
    );
}
const SaveComponent = (props) => {
    const {setAttributes} = props;
    const {
        customBackgroundColor,
        backgroundColor,
        alignment
    } = props.attributes;


    const divClass = getColorClassName('background-color', backgroundColor);

    const divStyles = {
        "background-color": customBackgroundColor,
        "text-align": alignment,
        "margin": 'auto'
    };
    const blockProps = useBlockProps.save(
        {
            style: divStyles,
            className: divClass
        }
    );
    return (<div {...blockProps}>
            <div {...props.attributes} className={"wp-react-lib-component"} data-component={"newsletter"}></div>
        </div>


    );
}

class EditWithSettings extends BlockEditWithFilters {
    render() {
        return <EditComponent
            src={this.state.react_ui_url + "/en/embeddable/newsletter?"} {...this.props}></EditComponent>
    }
}

registerBlockType(process.env.BLOCKS_NS + '/newsletter',
    {
        title: __('Newsletter Form'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            label: {
                type: 'string',
                default: "Send",
            }
            ,
            placeholder: {
                type: 'string',
                default: "Enter your email",
            }
            ,
            successMessage: {type: 'string', default: "Thanks for submitting"},
            failureMessage: {type: 'string', default: "Something didn't go well, please try again later"},
            list: {
                type: 'string',
                default: "",
            }


        }
        ,
        edit: withColors('backgroundColor', {textColor: 'color'})(EditWithSettings),
        save: SaveComponent,
    }
)
;
