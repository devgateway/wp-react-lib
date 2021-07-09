import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {useBlockProps, withColors} from '@wordpress/block-editor';
import {ResizableBox} from '@wordpress/components';
import Generic from "../icons";
import {BlockEditWithFilters} from "../commons";

const EditComponent = (props) => {
    const {attributes: {height}, toggleSelection, setAttributes} = props;

    const urlParams = new URLSearchParams(window.location.search);
    const parent = urlParams.get('post');

    const blockProps = useBlockProps({className: 'wp-react-component'});
    const queryString = `editing=true&parent=${parent}`;
    const divClass = ""
    const divStyles = {height: height + 'px', width: '100%'}

    return (
        <div>
            <ResizableBox
                size={{height}}
                style={{"margin": "auto", width: "100%"}}
                minHeight="200"
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
                <div {...blockProps} >

                    <iframe
                        style={{...divStyles}} className={divClass}
                        scrolling={"no"}
                        src={props.src + queryString}/>


                </div>
            </ResizableBox>
        </div>
    );
}
const SaveComponent = (props) => {
    const {} = props.attributes;
    const divClass = {}
    const divStyles = {}
    return (<div className={divClass} style={divStyles}>
            <div {...props.attributes} className={"wp-react-lib-component"} data-component={"pageGallery"}></div>
        </div>


    );
}


class EditWithSettings extends BlockEditWithFilters {
    render() {
        return <EditComponent
            src={this.state.react_ui_url + "/en/embeddable/pagegallery?"} {...this.props}></EditComponent>
    }
}

registerBlockType(process.env.BLOCKS_NS + '/page-gallery',
    {
        title: __('Child Pages Gallery'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            count: {
                type: 'number',
                default: 3,
            },
            height: {
                type: "number",
                default: 400
            }

        }
        ,
        edit: EditWithSettings,
        save: SaveComponent,
    }
)
;
