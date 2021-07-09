import {useBlockProps} from '@wordpress/block-editor';

const SaveComponent = (props) => {

    const {
        attributes: {
            placeHolder,
            type,
            param
        }
    } = props;
    const blockProps = useBlockProps.save({
        className: 'wp-react-lib component chart'
    });

    const divClass = {}
    const divStyles = {}


    return (
        <div className={"wp-react-lib-component"}
             data-component={"filter"}

             data-type={type}
             data-param={param}
             data-placeholder={placeHolder}
        >


        </div>


    );
}


export default SaveComponent
