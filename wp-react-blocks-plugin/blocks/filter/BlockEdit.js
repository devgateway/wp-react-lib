import {Component} from '@wordpress/element'
import {InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, SelectControl,TextControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';


class BlockEdit extends Component {


    constructor(props) {
        super(props);


    }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        const {
            className, isSelected,
            toggleSelection, setAttributes, attributes: {
                placeHolder,
                type,
                param
            }
        } = this.props;


        const queryString = `data-type=${type}&data-param=${param}&data-placeholder=${placeHolder}&editing=true`
        const divStyles = {}

        return ([isSelected && (<InspectorControls>
                <Panel header={__("Chart Configuration")}>
                    <PanelBody>
                        <PanelRow>

                            <SelectControl
                                label={__('Type:')}
                                value={[type]} // e.g: value = [ 'a', 'c' ]
                                onChange={(value) => {
                                    setAttributes({type: value})
                                }}
                                options={[
                                    {label: 'Area', value: 'Area'},
                                    {label: 'PovertyLevel', value: 'PovertyLevel'},
                                    {label: 'Race', value: 'Race'},
                                    {label: 'Gender', value: 'Gender'},
                                    {label: 'Education Level', value: 'EducationLevel'},
                                    {label: 'AgeGroup', value: 'AgeGroup'}]}
                            />

                        </PanelRow>

                        <PanelRow>
                            <SelectControl
                                label={__('Parameter')}
                                value={[param]} // e.g: value = [ 'a', 'c' ]
                                onChange={(value) => {
                                    setAttributes({param: value})
                                }}
                                options={[
                                    {label: 'Smoke', value: 'Area'},
                                    {label: 'Age Group', value: 'age'},
                                    {label: 'HouseHold Size', value: 'hs'},
                                    {label: 'Household Expenditure', value: 'he'},
                                    {label: 'Expenditure Per Capita', value: 'ep'},
                                    {label: 'Race', value: 'race'},
                                    {label: 'Gender', value: 'gender'}]}
                            />
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                label={__('Place Holder')}
                                value={placeHolder}
                                onChange={(placeHolder) => setAttributes({placeHolder})}
                            />
                        </PanelRow>
                    </PanelBody>
                </Panel>
            </InspectorControls>),

                (<div>

                        <iframe id={"id_description_iframe"} onLoad={e=>this.iframeLoaded()} scrolling={"no"} style={divStyles}
                                src={process.env.EMBEDDABLE_URI + "/filter?" + queryString}/>

                    </div>

                )]
        );

    }
}


const Edit = (props) => {

    const blockProps = useBlockProps();

    return <div {...blockProps}><BlockEdit {...props}/></div>;


}
export default Edit;