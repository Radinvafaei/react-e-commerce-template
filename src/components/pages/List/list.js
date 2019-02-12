import React , { Component } from 'react';
import Pagination from '../../global/Pagination/pagination';
function Filters(props) {
    let titles = props.titles;
    function updateName(evt) {
        props.updateFormState({ currentName: evt.target.value });
    }
    function updateTitle(evt) {
        props.updateFormState({ currentTitle: evt.target.value });
    }
    function resetFilters() {
        props.updateFormState({
            currentName: "",
            currentTitle: ""
        });
    }
    return (
        <form action="" id="directory-filters">
            <div className="form-group">
                <label htmlFor="person-name">product</label>
                <input
                    className="form-control"
                    type="text"
                    name="person_name"
                    placeholder="Name of product"
                    id="person-name"
                    value={props.currentName}
                    onChange={updateName}
                />
            </div>
            <div className="form-group">
                <label htmlFor="person-title">select</label>
                <select
                    className="form-control"
                    name="person_title"
                    id="person-title"
                    value={props.currentTitle}
                    onChange={updateTitle}>
                    <option value="">- Select -</option>
                    {titles.map(title => (
                        <option value={title.key} key={title.key}>
                            {title.display}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <input type="reset" className="btn btn-danger" value="Reset" onClick={resetFilters} />
            </div>
        </form>
    );
}
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiUrl : "",
            products : [],
            currentName : "",
            currentTitle : "",
            titles : [],
            shwProd : [],
            headTitle : "",
            totalItems : 0,
            itemsPerPage : 12,
            urls : [],
            nextUrl : "",
            prevUrl : ""
        };
        this.updateFormState = this.updateFormState.bind(this);
        this.updatePeopleList = this.updatePeopleList.bind(this);
    }
    updateFormState(spec) {
        this.setState(spec, this.updatePeopleList);
    }
    updatePeopleList() {
        this.setState({
            shwProd: this.state.products.filter(
                function(person) {
                    return (
                        (this.state.currentName === "" ||
                            person.name.toLowerCase().indexOf(this.state.currentName.toLowerCase()) !==
                            -1) &&
                        (this.state.currentTitle === "" ||
                            person.title_cat === this.state.currentTitle)
                    )
                }.bind(this))
        })
    }
    connection = (api) => {
        fetch("http://localhost:8888/exampleAPI"+api)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        products : result.prod,
                        shwProd : result.prod,
                        titles : result.titles,
                        headTitle : result.pageInfo[0].headTitle,
                        totalItems : result.pageInfo[0].pagination[0].totalItems,
                        itemsPerPage : result.pageInfo[0].pagination[0].itemsPerPage,
                        urls : result.pageInfo[0].pagination[0].urls,
                        nextUrl : result.pageInfo[0].pagination[0].nextUrl,
                        prevUrl : result.pageInfo[0].pagination[0].prevUrl
                    })
                }
            );
    };
    componentDidMount(){
        this.connection(this.state.apiUrl)
    }
    static getDerivedStateFromProps(props){
        return{
            apiUrl : `${props.location.hash}.json`.replace(/#/g,'')
        }
    }
    shouldComponentUpdate(newProps, newState) {
        if (this.state.apiUrl !== newState.apiUrl){
            this.connection(newState.apiUrl)
        }
        return true;
    }
    render() {
        const { currentName , currentTitle , isAvailable , titles , shwProd , urls , nextUrl , prevUrl , headTitle } = this.state;
        return (
            <div className="container-fluid">
                <div className="well">
                    <h2>{document.title = headTitle}</h2>
                    <Filters
                        currentName={currentName}
                        currentTitle={currentTitle}
                        isAvailable={isAvailable}
                        updateFormState={this.updateFormState}
                        titles={titles}
                    />
                    <Pagination
                        prod={shwProd}
                        urls={urls}
                        nextUrl={nextUrl}
                        prevUrl={prevUrl}
                    />
                </div>
            </div>
        );
    }
}
export default List
