import {InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {InnerBlocks} from '@wordpress/editor'; // or wp.editor
import {CheckboxControl, Panel, PanelBody, PanelRow, ResizableBox, TextControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {BaseBlockEdit} from "../commons";

class BlockEdit extends BaseBlockEdit {

    constructor(props) {
        super(props);


    }
    render() {
        const {
            className, isSelected,
            toggleSelection,
            setAttributes,
            attributes: {
                type,
                height,
                checkPng,
                checkJpg,
                buttonLabel,
                defaultFormat,
                pngLabel,
                jpgLabel,
                pngText,
                jpgText,
                title
            },
        } = this.props;


        const queryString = `editing=true&data-type=${type}&data-show-checkpng=${checkPng}&data-height=${height}&data-show-checkjpg=${checkJpg}&data-show-buttonlabel=${buttonLabel}&data-default-format=${defaultFormat}&data-default-pnglabel=${pngLabel}&data-default-jpglabel=${jpgLabel}&data-default-pngtext=${pngText}&data-default-jpgtext=${jpgText}&data-title=${title}`
        const divStyles = {height: "60px", width: '100%'}
        return (

            <div>
                <InspectorControls>
                    <Panel>
                        <PanelBody title={__("Default Format")}>
                            <PanelRow>
                            <div>
                            <input type="radio" id="png" name="png" value='PNG' onChange={()=> setAttributes({defaultFormat: event.target.value})}/>
                            <label for="PNG">PNG</label></div>
                            <div>
                            <input type="radio" id="jpg" name="png" value='JPG' onChange={()=> setAttributes({defaultFormat: event.target.value})}/>
                            <label for="JPG">JPG</label></div>
                            </PanelRow>
                        </PanelBody>
                        <PanelBody  title={__("Allows Format Selection")}>
                            <PanelRow>
                            <CheckboxControl
                            label = "PNG"
                            checked = {!checkPng}
                            onChange={() => setAttributes({checkPng: !checkPng})}/>
                            </PanelRow>
                            <PanelRow>
                                <CheckboxControl
                            label = "JPG"
                            checked = {!checkJpg}
                            onChange={() => setAttributes({checkJpg: !checkJpg})}/>
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("Button Label")}>
                            <PanelRow>

                            <TextControl
                                value={buttonLabel}
                                onChange={(buttonLabel) => setAttributes({buttonLabel})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("Drop Down Label")}>
                            <PanelRow>

                            <TextControl
                                value={title}
                                onChange={(title) => setAttributes({title})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("PNG File Name")}>
                            <PanelRow>

                            <TextControl
                                value={pngLabel}
                                onChange={(pngLabel) => setAttributes({pngLabel})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("JPG File Name")}>
                            <PanelRow>

                            <TextControl
                                value={jpgLabel}
                                onChange={(jpgLabel) => setAttributes({jpgLabel})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("PNG Text")}>
                            <PanelRow>

                            <TextControl
                                value={pngText}
                                onChange={(pngText) => setAttributes({pngText})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("JPG Text")}>
                            <PanelRow>

                            <TextControl
                                value={jpgText}
                                onChange={(jpgText) => setAttributes({jpgText})}
                                />
                            </PanelRow>
                        </PanelBody>

                    </Panel>


                </InspectorControls>
                <ResizableBox
                    size={{height}}
                    style={{"margin": "auto", "width": "100%"}}
                    minHeight="250"
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

                    <div style={{"border": "1px dotted #EEE"}}>

                        <iframe style={divStyles} scrolling={"no"} src={this.state.react_ui_url + "/en/embeddable/download?" + queryString}/>
                        <InnerBlocks/>

                    </div>
                </ResizableBox>
            </div>
        );

    }
}


const Edit = (props) => {
    const blockProps = useBlockProps();
    return <div {...blockProps}><BlockEdit {...props}/></div>;

}
export default Edit;