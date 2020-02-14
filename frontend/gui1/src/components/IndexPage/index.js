import React from 'react';
import './css/templatemo-style.css'
import './css/font-awesome.min.css'
import './css/demo.css'
import './css/bootstrap.min.css'


class Firstpage extends React.Component{

	 componentDidMount() {
      document.body.classList.add("body-css");
    }
  
    componentWillUnmount() {
      document.body.classList.remove("body-css");
    }


    render(){
        return (
        <div>
        	<div id="particles-js">
        	</div>
		
			<ul class="cb-slideshow">
	            <li></li>
	            <li></li>
	            <li></li>
	            <li></li>
	            <li></li>
	            <li></li>
	        </ul>

			<div class="container-fluid">
				<div class="row cb-slideshow-text-container ">
					<div class= "tm-content">
					<header class="mb-5">
						<h1 class="h1-class">SENTINET</h1>
					</header><br/>
					
					<p class="mb-5">Identifying and categorizing opinions expressed in a piece of text, especially in order to determine whether the writer's attitude towards a particular topic, product, etc. is positive, negative, or neutral.</p><br/>

					<header class="mb-5">
						<a href="map">MAP</a>
					</header>


					<header class="mb-5">
						<a href="graph">GRAPH</a>
					</header> 
					
                   

					</div>
				</div>
			</div>	
        </div>
        );
    }
}
    
export default Firstpage;