const SaveComponent = (props) => {
    const {
        setAttributes,
        attributes: {
            count,
            type,
            taxonomy,
            categories,
            height,
            width,
            showLabels,
            showIcons,
            theme,
        },
    } = props;

    const divClass = {}
    const divStyles = {}

//const queryString = `editing=true&data-type=${type}&data-taxonomy=${taxonomy}&data-categories=${categories}&data-items=${count}&data-height=${height}&data-width=${width}&data-theme=${theme}&data-show-icons=${showIcons}&data-user-labels=${useLabels}`
//data-theme=${theme}&data-show-icons=${showIcons}&data-show-labels=${useLabels}`
    return (<div className={divClass} style={divStyles}>
            <div
                data-items={count}
                data-height={height}
                data-width={width}
                data-type={type}
                data-taxonomy={taxonomy}
                data-categories={categories.toString()}
                data-show-labels={showLabels}
                data-show-icons={showIcons}
                data-theme={theme}
                className={"wp-react-lib-component"}
                data-component={"tabbedPosts"}>
            </div>
        </div>


    );
}


export default SaveComponent
