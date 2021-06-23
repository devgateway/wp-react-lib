import {InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {FormToggle, Panel, PanelBody, PanelRow, RangeControl, ResizableBox} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import SizeConfig, {BlockEditWithFilters} from "../commons";

class BlockEdit extends BlockEditWithFilters {
    constructor(props) {
        super(props);

    }

    render() {
        const {
            className, isSelected,
            toggleSelection,
            setAttributes,
            attributes: {
                count,
                type,
                taxonomy,
                categories,
                height,
                width,
                showIcons
            },
        } = this.props;


        const queryString = `editing=true&data-type=${type}&data-taxonomy=${taxonomy}&data-categories=${categories}&data-items=${count}&data-height=${height}&data-show-post-icons=${showIcons}`
        const divStyles = {height: height + 'px', width: '100%'}
        return (
            <div>
                <InspectorControls>
                    <Panel>
                        <SizeConfig height={height} setAttributes={setAttributes}></SizeConfig>

                        <PanelBody title={__("Visibility")}>

                            <PanelRow>
                                <p>{__("Show Post Icon")}</p>
                                <FormToggle
                                    label={__("Show Post Icon")}
                                    checked={showIcons}
                                    onChange={() => setAttributes({showIcons: !showIcons})}
                                />

                            </PanelRow>

                            <PanelRow>

                                <RangeControl
                                    label="Items"
                                    value={count}
                                    onChange={(count) => setAttributes({count})}
                                    min={2}
                                    max={10}
                                />

                            </PanelRow>
                        </PanelBody>
                        {this.renderFilters()}
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

                    <div style={divStyles}>
                        <iframe style={divStyles} scrolling={"no"}
                                src={this.state.react_ui_url + "/en/embeddable/inlinelist?" + queryString}/>
                    </div>
                </ResizableBox>
            </div>
        );

    }
}


const Edit = (props) => {
    const blockProps = useBlockProps({className: 'wp-react-component'});
    return <div {...blockProps}><BlockEdit {...props}/></div>;

}
export default Edit;

