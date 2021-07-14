import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {
    getColorClassName,
    InspectorControls,
    PanelColorSettings,
    useBlockProps,
    withColors
} from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, TextControl} from '@wordpress/components';
import Generic from "../icons";
import {BlockEditWithFilters} from "../commons";


const EditComponent = (props) => {
    const {
        src,
        backgroundColor,
        setBackgroundColor,
        toggleSelection,
        setAttributes,
        attributes: {
            organization,
            name,
            email,
            country,
            message,
            submitLabel,
            resetLabel,
            successMessage,
            failureMessage,
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
    let divStyles = {"text-align": alignment, "margin": 'auto'};
    if (backgroundColor != undefined) {
        if (backgroundColor.class != undefined) {
            divClass = backgroundColor.class;
        } else {
            divStyles['background-color'] = backgroundColor.color;
        }
    }

    const queryString = `editing=true&organization=${organization}&name=${name}&email=${email}&country=${country}&message=${message}&submitlabel=${submitLabel}&resetlabel=${resetLabel}&successmessage=${successMessage}&failuremessage=${failureMessage}&width=${width}&height=${height}&alignment=${alignment}`;

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
                                value={organization}
                                onChange={(organization) => props.setAttributes({organization: organization})}
                                label={"Organization Place Holder"}/>
                        </PanelBody>
                    </PanelRow>

                    <PanelRow>
                        <PanelBody>
                            <TextControl

                                value={name}
                                onChange={(name) => props.setAttributes({name: name})}
                                label={"Name Place Holder"}/>
                        </PanelBody>
                    </PanelRow>

                    <PanelRow>
                        <PanelBody>
                            <TextControl

                                value={email}
                                onChange={(email) => props.setAttributes({email: email})}
                                label={"Email Place Holder"}/>
                        </PanelBody>
                    </PanelRow>

                    <PanelRow>
                        <PanelBody>
                            <TextControl
                                value={country}
                                onChange={(country) => props.setAttributes({country: country})}
                                label={"Country Place Holder"}/>
                        </PanelBody>
                    </PanelRow>

                    <PanelRow>
                        <PanelBody>
                            <TextControl

                                value={message}
                                onChange={(message) => props.setAttributes({message: message})}
                                label={"Message Place Holder"}/>
                        </PanelBody>
                    </PanelRow>
                    <PanelRow>
                        <PanelBody>
                            <TextControl
                                value={submitLabel}
                                onChange={(submitLabel) => props.setAttributes({submitLabel: submitLabel})}
                                label={"Submit Label "}/>
                        </PanelBody>
                    </PanelRow>
                    <PanelRow>
                        <PanelBody>
                            <TextControl
                                value={resetLabel}
                                onChange={(resetLabel) => props.setAttributes({resetLabel: resetLabel})}
                                label={"Reset Label "}/>
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
            <div {...blockProps} >
                <div className={divClass} style={{...divStyles, width, height}}>
                    <iframe scrolling={"no"} style={{width, height}}
                            src={src + queryString}/>
                </div>

            </div>

        </div>
    );
}
const SaveComponent = (props) => {
    const {setAttributes} = props;
    const {
        customBackgroundColor,
        backgroundColor,
        width,
        height,
        alignment
    } = props.attributes;

    const divClass = getColorClassName('background-color', backgroundColor);

    const divStyles = {
        "background-color": customBackgroundColor,
        "text-align": alignment,
        "margin": 'auto'
    };
    return (<div className={divClass} style={divStyles}>
            <div {...props.attributes} className={"wp-react-lib-component"} data-component={"showCaseForm"}></div>
        </div>
    );
}

class EditWithSettings extends BlockEditWithFilters {
    render() {
        return <EditComponent src={this.state.react_ui_url + "/en/embeddable/showcaseForm?"} {...this.props}></EditComponent>
    }
}

registerBlockType(process.env.BLOCKS_NS + '/showcase',
    {
        title: __('Showcase Form'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            width: {
                type: 'string',
                default: "100%",
            }
            ,
            height: {
                type: 'string',
                default: "1200px",
            }
            ,
            backgroundColor: {
                type: 'string'
            },
            alignment: {type: 'string', default: 'center'},
            organization: {type: 'string', default: 'Organization'},
            name: {type: 'string', default: 'Name'},
            email: {type: 'string', default: 'Email'},
            country: {
                type: 'string', default: 'Country'
            },
            message: {type: 'string', default: 'Please write a message'},
            submitLabel: {type: 'string', default: 'Send'},
            resetLabel: {type: 'string', default: 'Reset'},
            successMessage: {type: 'string', default: "Thanks for submitting"},
            failureMessage: {type: 'string', default: "Something didn't go well, please try again later"},


        }
        ,
        edit: withColors('backgroundColor', {textColor: 'color'})(EditWithSettings),
        save: SaveComponent,
    }
)
;
