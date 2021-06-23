import {PanelBody, PanelRow, TextareaControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';


const PolicyConfig = ({app, setAttributes, csv}) => {

    return (
        <PanelBody initialOpen={false} title={__("CSV Configuration")}>


            <PanelRow>
                <TextareaControl
                    label={__("CSV Data")}
                    value={csv}
                    onChange={(csv) => setAttributes({csv})}
                />
            </PanelRow>
        </PanelBody>

    )

}

export default PolicyConfig