import {useBlockProps} from '@wordpress/block-editor';
import {InnerBlocks} from '@wordpress/editor'; // or wp.editor
const SaveComponent = (props) => {
    const {
        toggleSelection, setAttributes, attributes: {
            height,
            width,
            type,
            groupMode,
            bottomLegend,
            leftLegend,
            scheme,
            colorBy,
            policyLevel1,
            prevalenceLevel1,
            prevalenceLevel2,
            prevalenceLevel3,
            dualMode,
            toggleInfoLabel,
            toggleChartLabel,
            dataSourceLabel,
            dataSource,
            legendPosition,
            legendsWidth,
            showLegends,
            app,
            keys,
            tickColor,
            tickRotation,
            formatStyle,
            decimalPoints,
            currency,
            yearFilter,
            csv
        }
    } = props;
    const blockProps = useBlockProps.save({
        className: 'wp-react-lib component chart'
    });

    const divClass = {}
    const divStyles = {}

    const levels = app == 'prevalence' ? [prevalenceLevel1, prevalenceLevel2, prevalenceLevel3] : [policyLevel1];
    const source = levels.filter(l => l != 'none' && l != null).join('/')



    let params={}
    if (yearFilter!=null&&yearFilter.trim()!=="" && app==='policy'){
        const year=yearFilter.split(",").map(d=>parseInt(d))
        params["year"]=year
    }

        return (
            <div className={"wp-react-lib-component"}
                 data-component={"chart"}
                 data-height={height}
                 data-chart-type={type}
                 data-source={source}
                 data-color-by={colorBy}
                 data-color-scheme={scheme}
                 data-scheme={scheme}
                 data-group-mode={groupMode}
                 data-legends-left={leftLegend}
                 data-dualMode={dualMode}
                 data-legends-bottom={bottomLegend}
                 data-toggle-info-label={toggleInfoLabel}
                 data-toggle-chart-label={toggleChartLabel}
                 data-chart-source-label={dataSourceLabel}
                 data-chart-data-source={dataSource}
                 data-legends-width={legendsWidth}
                 data-show-legends={showLegends}
                 data-legend-position={legendPosition}
                 data-app={app}
                 data-tick-rotation={tickRotation}
                 data-tick-color={tickColor}
                 data-keys={keys.join(',')}
                 data-style={formatStyle}
                 data-decimals={decimalPoints}
                 data-currency={currency}
                 data-csv={csv}
                 data-params={encodeURIComponent(JSON.stringify(params))}>
                 <div className={"csv"}  dangerouslySetInnerHTML={{ __html: `<!-- ${csv} -->` }}>

                 </div>
                 <InnerBlocks.Content/>
            </div>


        );
}


export default SaveComponent
