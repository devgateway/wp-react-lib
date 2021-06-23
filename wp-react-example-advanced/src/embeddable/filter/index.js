import React, {useEffect} from "react";
import {Container} from "semantic-ui-react";
import {connect} from "react-redux";
import {getCategories, setFilter} from "../reducers/data";
import {DropDownFilter} from './Components'
import './filter.scss'

const Filter = ({
                    onApply, "data-type": type = 'AgeGroup', "data-param": param,
                    "data-placeholder": placeholder, categories, onLoadCategories
                }) => {
    useEffect(() => {
        onLoadCategories()
    }, [])

    if (categories) {


    }
    return <Container fluid={true} className={"filter"}>
        <DropDownFilter placeholder={placeholder} categories={categories} type={type} onChange={(e, {value}) => {
            onApply(param, value)
        }}></DropDownFilter>

    </Container>
}

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.getIn(['data', 'categories'])
    }
}

const mapActionCreators = {
    onApply: setFilter,
    onLoadCategories: getCategories
};

export default connect(mapStateToProps, mapActionCreators)(Filter)