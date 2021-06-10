import {TextControl, CheckboxControl, PanelBody, PanelRow, SelectControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {useEffect} from "react";


const PolicyConfig = ({app,  policyLevel1, setAttributes,  keys, yearFilter}) => {

    const dimensions = [
        {value: "year", label: 'Year'}

    ]



    const onKeyChange = (value) => {
        if (keys.indexOf(value) > -1) {
            setAttributes({keys: keys.filter(d => d != value)})
        } else {
            setAttributes({keys: [...keys, value]})
        }
    }

    return (
        <PanelBody initialOpen={false} title={__("Policy Configuration")}>

            <PanelRow>
                <SelectControl
                    label={__('First Dimension')}
                    value={[policyLevel1]} // e.g: value = [ 'a', 'c' ]
                    onChange={(value) => {
                        setAttributes({policyLevel1: value})
                    }}
                    options={dimensions}
                />
            </PanelRow>
            <PanelRow>
                <CheckboxControl
                    label={__("Official Consumption")}
                    checked={keys.indexOf("consumption") > -1}
                    onChange={e => onKeyChange("consumption")
                    }
                />
            </PanelRow>
            <PanelRow>
                <CheckboxControl
                    label={__("Total Consumption")}
                    checked={keys.indexOf("total") > -1}
                    onChange={e => onKeyChange("total")
                    }
                />
            </PanelRow>
            <PanelRow>
                <CheckboxControl
                    label={__("Excise rate")}
                    checked={keys.indexOf("rate") > -1}
                    onChange={e => onKeyChange("rate")}
                />
            </PanelRow>
            <PanelRow>
                <CheckboxControl
                    label={__("Retail Price")}
                    checked={keys.indexOf("price") > -1}
                    onChange={e => onKeyChange("price")}
                />
            </PanelRow>

            <PanelRow>
                <TextControl
                    label={__("Year Filter")}
                    value={ yearFilter }
                    onChange={ ( yearFilter ) => setAttributes( { yearFilter } ) }
                />
            </PanelRow>
        </PanelBody>

    )

}

export default PolicyConfig