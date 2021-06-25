import React, {useCallback, useEffect, useImperativeHandle, useState} from 'react'

import {Button, Container, Dropdown, Form, Grid, Input, Label, Message, TextArea} from 'semantic-ui-react'
import countryOptions from '../../countries'
import {reset, sendShowCaseForm} from "../reducers/embeddable";
import {connect} from "react-redux";
import {useDropzone} from "react-dropzone";

const options = countryOptions.map(c => {
    return {
        flag: c.flag.toLocaleLowerCase(),
        value: c.text,
        text: c.text
    }
})

const recaptchaRef = React.createRef();


function FileUploader({onSelectionChange, showValidation, inputRef, name}) {
    const [files, setFiles] = useState([])

    const onDrop = useCallback(acceptedFiles => {
        setFiles([...files, ...acceptedFiles])
    }, [files])

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        open
    } = useDropzone({accept: 'application/pdf,.doc,dox,.pdf,.xls', maxFiles: 5, multiple: true, onDrop});

    useImperativeHandle(inputRef, () => ({
        name,
        reset: () => {
            setFiles([])
        },
        hasErrors: () => files.length == 0,
        value: () => files
    }));


    const hasErrors = files.length === 0
    return (
        <Container fluid className={`upload files ${hasErrors && showValidation ? 'error' : ''}`}>
            <div {...getRootProps({className: "dropzone"})}>
                <input {...getInputProps()}/>
                <p>Drag 'n' drop files here, or click select button to select files</p>
                {files.length > 0 ? <ul>
                    {files.map(f => <li><Label color="green" icon='file'>{f.name}</Label></li>)}
                </ul> : null}

            </div>

            <Button secondary onClick={open}>Select</Button>
        </Container>
    );
}


const ValidatedDropDown = ({options, placeholder, name, required, showValidation, icon, inputRef}) => {

    const [value, setValue] = useState(null)
    const [error, setError] = useState(true)

    useEffect(() => {
        if (required && value == null) {
            setError(true)
        } else {
            setError(false)
        }
    }, [value])


    useImperativeHandle(inputRef, () => ({
        name,
        reset: () => {
            setValue(null)
        },
        value: () => value,
        hasErrors: () => error
    }));

    return <Dropdown
        value={value}

        error={error && showValidation}
        name={name}
        onChange={(e, value) => {
            setValue(value.value)

        }}
        fluid
        multiple={false}
        search
        selection
        options={options}
        placeholder={placeholder}

    />
}


const ValidatedField = ({placeholder, name, icon, required, pattern, as, inputRef, showValidation}) => {
    const [value, setValue] = useState("")
    const [error, setError] = useState(true)

    useEffect(() => {
        if ((required && value.trim() == "") || (pattern && !pattern.test(value))) {
            setError(true)
        } else {
            setError(false)
        }
    }, [value])


    useImperativeHandle(inputRef, () => ({
        name,
        reset: () => {
            setValue("")
        },
        hasErrors: () => error,
        value: () => value
    }));


    const C = as ? as : Input
    return <C
        value={value}

        error={error && showValidation}
        onChange={e => setValue(e.target.value)}
        name={name} icon={icon}
        iconPosition='left'
        placeholder={placeholder}/>

}


class Index extends React.Component {
    state = {};
    iframe = React.createRef();

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this)
        this.reset = this.reset.bind(this)
        this.captchaChange = this.captchaChange.bind(this)
        this.inputs = {};

        this.setInput = this.setInput.bind(this)
    }


    componentDidMount() {

    }

    captchaChange(value) {
        this.setState({token: value})
    }


    setInput(el) {
        if (el) {
            this.inputs[el.name] = el
        }

    }


    reset() {

        const elements = Object.keys(this.inputs).map(k => this.inputs[k])
        elements.forEach(e => {
            e.reset()
        })
        this.setState({showValidation: false, status: null})
        this.props.onReset()
    }

    submitForm(e) {
        const elements = Object.keys(this.inputs).map(k => this.inputs[k])
        let hasErrors = elements.map(e => e.hasErrors()).reduce((a, b) => a || b)

        const files = this.state.files
        //hasErrors = hasErrors || this.state.token == null
        if (hasErrors) {
            this.setState({showValidation: true})
        } else {
            const values = {}
            elements.forEach(e => values[e.name] = e.value())
            //  values['token'] = this.state.token
            this.props.onSubmit(values)

        }


    }


    render() {
        const {
            status,
            organization = "Organization",
            name = "Name",
            email = "Email",
            country = "Country",
            message = "Message",
            resetlabel = "Reset",
            submitlabel = "Submit",
            successmessage = "Thanks for submitting",
            failuremessage = "Something didn't go well, please try again later",
            editing
        } = this.props
        const {showValidation, token, reset} = this.state


        return <Container fluid={true} className="tcdi showcase">

            {(status == 'ERROR' || editing) && <Message negative>
                <p>{failuremessage}</p>
            </Message>}

            {(status == 'OK' || editing) && <Message
                success
                content={<p>{successmessage}</p>}
            />}

            <Grid columns={1} className={this.state.showValidation ? 'validated' : ''}>


                <Grid.Column>
                    <ValidatedField inputRef={el => this.setInput(el)} showValidation={showValidation} required={true}
                                    icon={"building"}
                                    name={"organization"} placeholder={organization}/>
                </Grid.Column>

                <Grid.Column>
                    <ValidatedField inputRef={el => this.setInput(el)} showValidation={showValidation} required={true}
                                    icon={"user"}
                                    name={"name"}
                                    placeholder={name}/>
                </Grid.Column>

                <Grid.Column>
                    <ValidatedField

                        inputRef={el => this.setInput(el)} showValidation={showValidation} required={true}
                        pattern={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
                        icon={"envelope"}
                        placeholder={email}
                        name={"email"}/>
                </Grid.Column>

                <Grid.Column>
                    <Form.Field>
                        <ValidatedDropDown inputRef={el => this.setInput(el)}
                                           showValidation={showValidation}
                                           name={"country"}
                                           required={true}
                                           options={options}
                                           placeholder={country}/>
                    </Form.Field>
                </Grid.Column>

                <Grid.Column>

                    <FileUploader inputRef={el => this.setInput(el)}
                                  showValidation={showValidation}
                                  name="files"></FileUploader>

                </Grid.Column>

                <Grid.Column>
                    <ValidatedField inputRef={el => this.setInput(el)} placeholder={message} name={"message"}
                                    as={TextArea}/>
                </Grid.Column>


                <Grid.Row>

                    <Grid.Column textAlign={"left"} width={12} verticalAlign="bottom" className="form-buttons">
                        <Button className="btn-reset"
                                onClick={e => this.reset()}>{resetlabel}</Button>
                        <Button secondary={true}
                                onClick={e => this.submitForm()}>{submitlabel}</Button>
                    </Grid.Column>

                </Grid.Row>


                {(status == 'OK' || editing) && <Grid.Column width={16}> <Message
                    success
                    content={<p>{successmessage}</p>}
                /></Grid.Column>}

                {(status == 'ERROR' || editing) && <Grid.Column width={16}> <Message negative>
                    <p>{failuremessage}</p>
                </Message></Grid.Column>}

            </Grid>

        </Container>
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        status: state.getIn(['embeddable', 'showCase', 'status'])
    }
}

const mapActionCreators = {
    onSubmit: sendShowCaseForm,
    onReset: reset
};

export default connect(mapStateToProps, mapActionCreators)(Index)
