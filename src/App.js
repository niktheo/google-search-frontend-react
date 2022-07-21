import React from 'react'
import './styles.css'
const axios = require('axios').default;

class App extends React.Component {

	state={
		results:[],
		originalResults:[],
		val:''

	}

search=(e)=>{
	//console.log(e.target.value)
	this.setState({
		val:e.target.value

	})
	console.log(e.target.value);
}
// searchButton=()=>{
// 	let data=this.state.results
// 	let finded= data.filter((e)=>{
// 	 		return (e.title==this.state.searchTerms )
// 	 })
// 	 this.setState({
// 		 results:finded
// 	 })
// 	console.log(data.results)
// 	//console.log(this.state.searchTerms);
//
// }

searchButton= async()=>{
	let response= await axios.get(`http://localhost:3000/results?searchTerms=${this.state.val}`)
	console.log(response)
	this.setState({
		results:response.data
})
}

  render() {
    return (
			<>

			<div className="results_page">
			<nav className="navbar">
			      <img className="logo2" src="/google.png" alt="" />
			      <form className="form2">
			        <input className="search2" type="text" onChange={e=>this.search(e)}/>
			        <input
			          className="but2"
			          type="button"
			          value="Search"
								onClick={()=>this.searchButton()}
			        />
			      </form>
			    </nav>


<div className="firstResult">
{this.state.results?<p className="results">{this.state.results.length} Results {this.state.results.map((result,idx)=>{
		return (<>
			<small>{result.url}</small>

			<h2>
				<a href={result.url}>{result.title}</a>
			</h2>
			<p>
				{result.description}
			</p>
			<ul>
			    {result.links.map((link,idx)=>{
					return (
							<>
								<li key={idx}>
									<a href={link.url}>{link.title}
									</a>
								</li>
							</>
					)

					})}
			</ul>
			</>)
})}</p>:<span className="results">No Results for these terms.</span>}


</div>
</div>
			</>)
  }
}
export default App
