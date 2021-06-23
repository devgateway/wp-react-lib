import {InspectorControls, PanelColorSettings, useBlockProps} from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, RangeControl, ResizableBox, TextControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';

import {BlockEditWithFilters} from '../commons'


class BlockEdit extends BlockEditWithFilters {
    constructor(props) {
        super(props);
    }

    onChangeColor(i, value) {
        const {
            setAttributes,
            attributes: {
                colors
            },
        } = this.props;

        const newColors = Object.assign({}, colors)
        newColors["color_" + i] = value

        setAttributes({"colors": newColors})

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
                colors,
                readMoreLabel
            },
        } = this.props;

        const colorsParams = Object.keys(colors).map(k => colors[k]).join(",")
        const queryString = `editing=true&data-type=${type}&data-taxonomy=${taxonomy}&data-categories=${categories}&data-items=${count}&data-height=${height}&data-color=${encodeURIComponent(colorsParams)}&data-read-more-label=${readMoreLabel}`
        const divStyles = {height: height + 'px', width: "100%"}
        return (
            <div>

                <InspectorControls>
                    <Panel header={__("Tabs Configuration")}>
                        <PanelBody title={__("Items & Labels")}>
                            <PanelRow>
                                <RangeControl
                                    label="Items"
                                    value={count}
                                    onChange={(count) => setAttributes({count})}
                                    min={2}
                                    max={10}
                                />

                            </PanelRow>
                            <PanelRow>
                                <TextControl
                                    label={__('Read More Label')}
                                    value={readMoreLabel}
                                    onChange={(readMoreLabel) => setAttributes({readMoreLabel})}
                                />

                            </PanelRow>

                        </PanelBody>

                        {this.renderFilters()}

                        <PanelBody title={__("Colors")}>
                            {new Array(count).fill(1).map((v, i) =>
                                <PanelRow>
                                    <PanelColorSettings
                                        title={__(`Color Settings  ${i + 1}`)}
                                        colorSettings={[
                                            {
                                                value: colors["color_" + i],
                                                onChange: (colorValue) => this.onChangeColor(i, colorValue),
                                                label: __('Background Color'),
                                            }
                                        ]}
                                    >

                                    </PanelColorSettings>
                                </PanelRow>
                            )}

                        </PanelBody>

                    </Panel>

                </InspectorControls>

                <ResizableBox
                    size={{height}}
                    style={{"margin": "auto", width: "100%"}}
                    minHeight="150"
                    minWidth="250"
                    enable={{
                        top: false,
                        right: true,
                        bottom: true,
                        left: false,
                        topRight: true,
                        bottomRight: true,
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
                        {<iframe style={divStyles} scrolling={"no"}
                                 src={this.state.react_ui_url + "/en/embeddable/featuredtabs?" + queryString}/>}

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

