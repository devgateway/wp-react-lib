import {InnerBlocks} from '@wordpress/editor'; // or wp.editor

const SaveComponent = (props) => {
    const {
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
    } = props;

    const divClass = {}
    const divStyles = {}

    return (<div className={divClass} style={divStyles}>
                <div
                     data-height={height}
                     className={"wp-react-lib-component"}
                     data-component={"download"}
                     data-show-checkpng={checkPng}

                     data-show-checkjpg={checkJpg}
                     data-show-buttonlabel={buttonLabel}
                     data-default-format={defaultFormat}
                     data-default-pnglabel={pngLabel}
                     data-default-jpglabel={jpgLabel}
                     data-default-pngtext={pngText}
                     data-default-jpgtext={jpgText}
                     data-title={title}>

                    <InnerBlocks.Content></InnerBlocks.Content>
                </div>
        </div>


    );
}


export default SaveComponent
