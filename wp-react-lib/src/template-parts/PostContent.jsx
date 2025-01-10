import React, { Suspense } from 'react'

const Content = React.lazy(() => import('./Content'))

const PostContent = (props) => {
    return <Suspense>
        <Content {...props} showContent={true}></Content>
    </Suspense>
}

export default PostContent