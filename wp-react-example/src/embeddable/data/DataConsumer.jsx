import React from 'react'
import DataContext from './DataContext'

const PostConsumer = (props) => {


    return (
        <DataContext.Consumer>

            {(data) => {

                return data && <React.Fragment>
                     {React.Children.map(props.children, (child => {
                    return React.cloneElement(child, {data})
                    }))}
                </React.Fragment>
            }}
        </DataContext.Consumer>
    )
}


export default PostConsumer
