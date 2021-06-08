import {Component} from '@wordpress/element'
import {InspectorControls,useBlockProps} from '@wordpress/block-editor';
import {
    __experimentalNumberControl as NumberControl,
    CheckboxControl,
    Panel,
    PanelBody,
    PanelRow,
    SelectControl
} from '@wordpress/components';
import {__} from '@wordpress/i18n';

const MyDropdown = (selected, options, onChange) => (

    <SelectControl
        label={__('Select some users:')}
        value={[selected]} // e.g: value = [ 'a', 'c' ]
        onChange={(value) => {
            onChange({value})
        }}
        options={options}
    />
);


class BlockEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taxonomyValues: [],
            types: null,
            taxonomies: null,
            loading: true
        }
        this.onTypeChanged = this.onTypeChanged.bind(this)
        this.onTaxonomyChanged = this.onTaxonomyChanged.bind(this)
        this.getTaxonomyValues = this.getTaxonomyValues.bind(this)
        this.onCategoryChanged = this.onCategoryChanged.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            setAttributes,
            attributes: {
                type,
                taxonomy,
                count
            },
        } = this.props;

        if (prevProps.attributes) {
            if (type != prevProps.attributes.type) {

            }
            if (taxonomy != prevProps.attributes.taxonomy) {
                this.getTaxonomyValues()

            }
        }

    }

    componentDidMount() {
        this.getTypes();
        this.getTaxonomies()

        const {
            setAttributes,
            attributes: {
                type,
                taxonomy,
                count
            },
        } = this.props;


        if (taxonomy != 'none') {
            this.getTaxonomyValues()

        }

    }

    onTypeChanged(value) {
        const {setAttributes} = this.props
        setAttributes({categories: []})
        setAttributes({taxonomy: 'none'})
        setAttributes({type: value})
    }

    onTaxonomyChanged(value) {
        const {setAttributes} = this.props
        setAttributes({categories: []})
        setAttributes({taxonomy: value})

    }

    onCategoryChanged(checked, value) {
        const {setAttributes, attributes: {categories}} = this.props
        if (!checked) {
            setAttributes({categories: categories.filter(i => i != value)})
        } else {
            let newCate = [...categories]
            newCate.push(value)
            setAttributes({categories: newCate})
        }

    }

    getTaxonomyValues() {
        const {
            setAttributes,
            attributes: {
                type,
                taxonomy,
                count
            },
        } = this.props;

        wp.apiFetch({
            path: '/wp/v2/' + taxonomy + '?per_page=100',
        }).then(data => {

            this.setState({taxonomyValues: data,});
        });
    }

    getTaxonomies() {


        wp.apiFetch({
            path: '/wp/v2/taxonomies?per_page=100',
        }).then(data => {
            this.setState({
                taxonomies: data,
            });
        });
    }

    getTypes() {
        wp.apiFetch({
            path: '/wp/v2/types?per_page=100',
        }).then(data => {
            const types = data
            this.setState({
                types: data,
                loading: false
            });
        });
    }

    typeOptions() {
        const {
            setAttributes,
            attributes: {
                count,
                type,
                taxonomy,
                category
            },
        } = this.props;
        const {types, taxonomies, taxonomyValues} = this.state
        const typeOptions = types ? Object.keys(types)
            .filter(k => ['page', 'attachment', 'wp_block']
                .indexOf(k) == -1).map(k => ({
                slug: types[k].slug,
                label: types[k].name,
                value: types[k].rest_base
            })) : []

        return typeOptions

    }

    taxonomyOptions() {
        const {
            attributes: {
                type,
            },
        } = this.props;
        const {types, taxonomies, taxonomyValues} = this.state
        let slug;
        if (types) {
            slug = this.typeOptions().filter(t => t.value == type)[0].slug

            const taxonomyOptions = types && taxonomies ? Object.keys(taxonomies)
                .filter(i => taxonomies[i].types.indexOf(slug) > -1).map(k => ({
                    label: types[slug].name + ' -> ' + taxonomies[k].name,
                    value: taxonomies[k].rest_base
                })) : []

            return [{label: 'None', value: 'none'}, ...taxonomyOptions]
        } else {
            return []
        }
    }

    categoriesOptions() {
        const {types, taxonomies, taxonomyValues} = this.state
        const taxonomyValuesOptions = taxonomyValues && taxonomyValues.map(t => ({label: t.name, value: t.id}))
        console.log(taxonomyValuesOptions)
        return taxonomyValuesOptions
    }

    render() {
        const {
            setAttributes,
            attributes: {
                count,
                type,
                taxonomy,
                categories
            },
        } = this.props;


        const queryString = `editing=true&data-type=${type}&data-taxonomy=${taxonomy}&data-categories=${categories}&data-items=${count}`
        const divStyles = {height: '500px', width: '100%'}

        return (
            <div>
                <InspectorControls>
                    <Panel header={__("Carousel Configuration")}>
                        <PanelBody>
                            <PanelRow>
                                <NumberControl
                                    isShiftStepEnabled={true}
                                    onChange={(count) => setAttributes({count})}
                                    shiftStep={10}
                                    value={count}
                                    label={__("Items")}/>
                            </PanelRow>

                            <PanelRow>

                                <SelectControl
                                    label={__("Post Type")} options={this.typeOptions()}
                                    value={type}
                                    onChange={this.onTypeChanged}/>
                            </PanelRow>
                            <PanelRow>

                                <SelectControl label={__("Use a taxonomy filter ")} options={this.taxonomyOptions()}
                                               value={taxonomy}
                                               onChange={this.onTaxonomyChanged}
                                />
                            </PanelRow>
                            {taxonomy != 'none' && this.categoriesOptions().map(o => {
                                return <PanelRow><CheckboxControl
                                    label={o.label}
                                    onChange={(checked) => this.onCategoryChanged(checked, o.value)}
                                    checked={categories.indexOf(o.value) > -1}
                                /></PanelRow>
                            })}

                        </PanelBody>
                    </Panel>
                </InspectorControls>
                {<iframe style={divStyles} scrolling={"no"}
                         src={process.env.EMBEDDABLE_URI + "/postscarousel?" + queryString}/>}

            </div>
        );

    }
}
const Edit = (props) => {
    const blockProps = useBlockProps();
    return <div {...blockProps}><BlockEdit {...props}/></div>;

}
export default Edit;

