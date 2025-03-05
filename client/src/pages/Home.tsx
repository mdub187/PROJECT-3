//what do we want the user to see when the page loads
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_USER, SEARCH_RESOURCES } from "../utils/queries";
import { Axios } from "axios";
import { Component } from "react";

const Home = () => {
    return (
    <div>
        {/* <nav classname="homeNav"> */}
        <nav className="navbar">
            <input type="text" placeholder="Search" className="btn btn-primary btn-md">Search</input>
            <button type="button" href="/search" className="btn btn-primary btn-md">Search</button>
            </nav>
        <Link to="/" className="login">
            Back To Login
        </Link>
        <ul className="card">
            <card1>1</card1>
            <card2>2</card2>
            <card3>3</card3>
            <card4>4</card4>
            <card5>5</card5>
            <card6>6</card6>
        </ul>
        <Query query={getLogin}>
        {(result: QueryResult) => {
          const { loading, error, data } = result;

            // ...rest here
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error!</p>;

            return data.viewer.map( item => {
                <div key={item.login}>
                    <p>{item.login}</p>
                </div>
            });
        }};
</Query>
        <footer>
            <h1>with &#x2665;</h1>
        </footer>
        </div>
    </div>
    )
};

// export default Home;
    
//nav bar
//search bar
//6 card components from the db
//footer

//create functional home component
//use the useQuery hook from apollo client library and import the query from utils/query.ts. this should match the backend because the backend is working
const Resources = () => {
    const apiURL = process.env.http://localhost:3000
    const fetchRecources = async () => {
        const response = await .get(apiURL);
        return response.data;
    setResources(response.data);
    };
    const { data,loading,error,refetch} = useQuery("resourceData", () => fetchRecources());
        fetchRecources();

        if (loading) {
            return <h1>Loading ....</h1>;
        }

        if (error) {
            return <p className="error">{error.message}</p>;
        }
        return (
            <div className="container">
                <ul>
                    {data?.map((resource:) => (
                    <li key={resource?.id}>{resource?.title}</li>
                    ))}
                </ul>
                <button onClick={refetch} className="btn btn-primary btn-md">Re fetch</button>
            </div>
        );
        };
    
export default Resources, Home;

//create state variable: const {resources, setResources} = useState[]

const {resources, setResources} = useState([]);
        useEffect(() => {
            fetch('http://localhost:3000/resources'
            .then(response => response.json())
            .then(json =>)
            )


        }
    
    
    
    
    )

//once data is in the useState variable then it will kickoff the JSX to map through and create a card for each object from the query

//useEffect for after the render of the initial component to call the callback function to run query
class ResourceCard extends React.Component typeOf <Cards></Cards>
{



}
//have UL created to see each item to display on the screen. At that point we can work on styling the cards

//generate 6 cool resources with good links in the documents to render to the page