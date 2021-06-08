import {PanelBody, PanelRow, SelectControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {useEffect} from "react";


 const PrevalenceConfig = ({app, height,prevalenceLevel1,prevalenceLevel2,prevalenceLevel3, setAttributes, initialOpen}) => {

    const dimensions=[
        {value: 'none', label: 'None'},
        {value: "gender", label: 'Gender'},
        {value: "age", label: 'Age'},
        {value: "area", label: 'Area'},
        {value: "gender", label: 'Poverty'},
        {value: "race", label: 'Race'},
        {value: "education", label: 'Education'},
        {value: "poverty", label: 'Poverty'},
        {value: "smoke", label: 'Smoke'}
    ]


     return (
        <PanelBody initialOpen={false} title={__("Prevalence Configuration")}>
            <PanelRow>
                <SelectControl
                    label={__('First Dimension')}
                    value={[prevalenceLevel1]} // e.g: value = [ 'a', 'c' ]
                    onChange={(value) => {
                        setAttributes({prevalenceLevel1: value})
                    }}
                    options={dimensions}
                />
            </PanelRow>

            <PanelRow>
                <SelectControl
                    label={__('Second Dimension')}
                    value={[prevalenceLevel2]} // e.g: value = [ 'a', 'c' ]
                    onChange={(value) => {
                        setAttributes({prevalenceLevel2: value})
                    }}
                    options={dimensions}
                />
            </PanelRow>
            <PanelRow>
                <SelectControl
                    label={__('Third dimension')}
                    value={[prevalenceLevel3]} // e.g: value = [ 'a', 'c' ]
                    onChange={(value) => {
                        setAttributes({prevalenceLevel3: value})
                    }}
                    options={dimensions}
                />
            </PanelRow>

        </PanelBody>

    )

}

export default PrevalenceConfig