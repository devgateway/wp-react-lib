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
            colors,
            showIcons
        },
    } = props;

    const divClass = {}
    const divStyles = {}
    const colorsParams = Object.keys(colors).map(k => colors[k]).join(",")
    return (<div className={divClass} style={divStyles}>
                <div data-items={count}
                     data-height={height}
                     data-width={width}
                     data-color={colorsParams}
                     data-type={type} data-taxonomy={taxonomy} data-categories={categories.toString()}
                     className={"wp-react-lib-component"}
                     data-show-post-icons={showIcons}
                     data-component={"inlineList"}>
                </div>
        </div>


    );
}


export default SaveComponent
