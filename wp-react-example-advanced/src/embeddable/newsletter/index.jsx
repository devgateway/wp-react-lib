import React from 'react'
import {Button, Input, Message} from 'semantic-ui-react'
import {connect} from "react-redux";
import {newsletterSubscription} from "../reducers/embeddable";

class Index extends React.Component {

    state = {};

    constructor() {
        super();
        this.emailRef = React.createRef();
        this.submit = this.submit.bind(this)
    }

    componentDidMount() {
    }

    submit() {
        const {onSubmit, list} = this.props
        this.props.onSubmit({email: this.emailRef.current.inputRef.current.value, list: list})
            .then(e => {
                console.log("all send")
            }).catch(e => {
            console.log("error")
        })
    }

    render() {
        const {
            status,
            editing,
            list,
            placeholder = "enter your email address",
            successmessage = "Thanks",
            failuremessage = "Something didn't go well",
            label = "Send"
        } = this.props

        let message = ""

        if (status === "OK" || editing) {
            message = (<Message success>
                <p>{successmessage}</p>
            </Message>)
        }

        if (status === "ERROR") {
            message = (<Message negative>
                <p>{failuremessage}</p>
            </Message>)
        }

        return <div className="wp-react-lib newsLetter">

            <div className="wp-react-lib newsLetter form">
                <Input icon='envelope' name="email" ref={this.emailRef} iconPosition='left' placeholder={placeholder}/>
                <Button primary onClick={e => this.submit()}>{label}</Button>
            </div>
            {message}
        </div>
    }
};


const mapStateToProps = (state, ownProps) => {
    return {
        status: state.getIn(['embeddable', 'newsletter', 'status'])
    }
}

const mapActionCreators = {
    onSubmit: newsletterSubscription
};

export default connect(mapStateToProps, mapActionCreators)(Index)
