import React, {useRef, useState} from 'react';
import {Button, Container, Dropdown, Icon} from "semantic-ui-react";
import {saveAs} from 'file-saver';
import {exportComponentAsJPEG} from 'react-component-export-image';
import {toBlob} from 'html-to-image';
import {PostContent} from "@devgateway/wp-react-lib";

const DownloadableContent = React.forwardRef((props, ref) => (
    <div ref={ref}>{props.children}</div>
));
const DownloadComponent = (props) => {
    const componentRef = useRef();
    const {
        childContent,
        "data-height": height,
        "data-show-buttonlabel": buttonLabel,
        "data-default-pnglabel": pngLabel,
        "data-default-jpglabel": jpgLabel,
        'data-default-jpgtext': jpgText,
        'data-default-pngtext': pngText,
        "data-show-checkpng": checkPNG = true,
        "data-show-checkjpg": checkJPG = true,
        "data-title": title,
        "data-default-format": defaultFormat = "PNG",
        parent,
        editing,
        component,
        unique

    } = props
    const [fileType, setFileType] = useState(defaultFormat)
    const handleChange = (e) => {
        setFileType(e.target.value)
    }

    function filter(node) {
        if (node.classList) {
            return !node.classList.contains("ignore")
        }
        return true;
    }

    const saveJPG = () => {
        exportComponentAsJPEG(componentRef, {fileName: jpgLabel})
    }
    const savePNG = () => {

        toBlob(componentRef.current, {
            filter,
            "backgroundColor": "#FFF",
        })
            .then(function (blob) {
                saveAs(blob, pngLabel);
            });
    }
    const onClickHandler = (type) => {
        setFileType(type)
        if (type === "JPG") {
            saveJPG()
        }
        if (type === "PNG") {
            savePNG()
        }
    }
    return (

        <Container className={`wp-react-lib download ${editing ? 'editing' : ''}`} fluid={true}>
            <React.Fragment>
                <div>
                    <div className='download-feature'>
                        <Button className={"download"} onClick={() => onClickHandler(fileType)}>
                            {buttonLabel} {fileType === 'PNG' ? 'PNG' : 'JPG'}
                        </Button>

                        <Dropdown
                            trigger={<Icon name={"download"} className='download-icon'></Icon>}
                        >
                            <Dropdown.Menu>
                                {title}
                                {checkPNG === 'false' ? <Dropdown.Item onClick={() => onClickHandler('PNG')}>
                                    <input type='radio' value='PNG' checked={fileType === 'PNG'}
                                           onChange={handleChange}/>
                                    <label>{pngText}</label>
                                </Dropdown.Item> : null}

                                {checkJPG === 'false' ? <Dropdown.Item onClick={() => onClickHandler('JPG')}>
                                    <input type='radio' value='JPG' checked={fileType === 'JPG'}
                                           onChange={handleChange}/>
                                    <label>{jpgText}</label>
                                </Dropdown.Item> : null}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>


                {!editing && <DownloadableContent ref={componentRef}>
                    <Container fluid={true} className={"body"}>
                        <PostContent post={{content: {rendered: childContent}}}></PostContent>
                    </Container>

                </DownloadableContent>}
            </React.Fragment>
        </Container>

    );
};

export default DownloadComponent;
