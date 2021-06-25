import React, {Component} from 'react'
import {Image, Label, Menu} from 'semantic-ui-react'


function smoothscroll(idx) {
    const offsetTop = 0
    let offset = () => 10

    const $anchor = idx ? document.getElementById(idx) : null
    if ($anchor) {
        const offsetTop = $anchor.getBoundingClientRect().top + window.pageYOffset;
        window.scroll({
            top: offsetTop - offset(),
            behavior: 'smooth'
        })
    }

}


export default class Navigator extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {contextRef, sections = [], navTitle, toTopLabel} = this.props
        const activeItem = ''
        return (<div className="left navigator">
            <Menu vertical>
                <Menu.Item header>{navTitle}</Menu.Item>

                {sections.map(s => <Menu.Item key={s.label} active={s.active} onClick={e => smoothscroll(s.id)}>
                    {s.iconComponent ? s.iconComponent : <Image src={s.icon}/>}
                    <Label basic> {s.label}</Label>
                </Menu.Item>)}

                <Menu.Item header onClick={e => window.scrollTo({
                    top: 100,
                    left: 100,
                    behavior: 'smooth'
                })}>{toTopLabel}</Menu.Item>

            </Menu>
        </div>)
    }
}
