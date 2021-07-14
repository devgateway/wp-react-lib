const SaveComponent = (props) => {
    const {
        setAttributes,
        attributes: {
            count,
            type,
            taxonomy,
            categories,
            height,
            colors,
            readMoreLabel,
        },
    } = props;

    const divClass = {}
    const divStyles = {}
    const colorsParams = Object.keys(colors).map(k => colors[k]).join(",")
    return (<div className={divClass} style={divStyles}>
                <div data-items={count}
                     data-height={height}
                     data-color={colorsParams}
                     data-type={type} data-taxonomy={taxonomy} data-categories={categories.toString()}
                     className={"wp-react-lib-component"}
                     data-read-more-label={readMoreLabel}
                     data-component={"featuredTabs"}>
                </div>
        </div>


    );
}


export default SaveComponent
