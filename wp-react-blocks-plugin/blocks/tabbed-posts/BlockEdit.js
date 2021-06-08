import {Component} from '@wordpress/element'
import {InspectorControls, PanelColorSettings, useBlockProps} from '@wordpress/block-editor';
import {
    CheckboxControl,
    FormToggle,
    Panel,
    PanelBody,
    PanelRow,
    RangeControl,
    ResizableBox,
    SelectControl
} from '@wordpress/components';
import {__} from '@wordpress/i18n';

import {BlockEditWithFilters,Filter} from '../commons/index.js'


const MyDropdown = (selected, options, onChange) => (
    <SelectControl
        label={__('Select some users:')}
        value={[selected]} // e.g: value = [ 'a', 'c' ]
        onChange={(value) => {
            onChange({value})
        }}
        options={options}
    />
);


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
                theme,
                showIcons,
                useLabels
            },
        } = this.props;


        const queryString = `editing=true&data-type=${type}&data-taxonomy=${taxonomy}&data-categories=${categories}&data-items=${count}&data-height=${height}&data-theme=${theme}&data-show-icons=${showIcons}&data-show-labels=${useLabels}`
        const divStyles = {height: height + 'px', width: '100%'}
        return (
            <div>
                <InspectorControls>
                    <Panel>
                        <PanelBody title={__("Visibility")}>
                            <PanelRow>
                                <p>{__("Light Theme")}</p>
                                <FormToggle
                                    label={__("Show Icon")}
                                    checked={theme == 'light'}
                                    onChange={() => setAttributes({theme: theme == 'light' ? 'buttons' : 'light'})}
                                />

                            </PanelRow>
                            <PanelRow>
                                <p>{__("Use Labels")}</p>
                                <FormToggle
                                    checked={useLabels}
                                    onChange={() => setAttributes({useLabels: !useLabels})}
                                />
                            </PanelRow>
                            <PanelRow>
                                <p>{__("Show Icons")}</p>
                                <FormToggle
                                    label={__("Show Icon")}
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
                                    max={10}/>
                            </PanelRow>
                        </PanelBody>
                        {this.renderFilters()}
                    </Panel>
                </InspectorControls>

                <ResizableBox
                    size={{height}}
                    style={{"margin": "auto",width: "100%"}}
                    minHeight="200"
                    minWidth="100"
                    enable={{
                        top: false,
                        right: false,
                        bottom: true,
                        left: false,
                        topRight: true,
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
                        <iframe  style={divStyles} scrolling={"no"} src={process.env.EMBEDDABLE_URI + "/tabbedposts?" + queryString}/>
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

