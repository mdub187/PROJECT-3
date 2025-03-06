// //what do we want the user to see when the page loads
// import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { SEARCH_RESOURCES } from "../utils/queries";
interface Resources{
    title: string;
    description: string;
    url: string;
    category: string
} 
const Home = () => { 



    // define variables and functions 
    const { loading, error, data } = useQuery(SEARCH_RESOURCES);
    const resourceData = data?.resources || [];
    return ( 
    <div>
        <h2>Resource Data</h2>
        {
            loading ? (
                <h3>loading ...</h3>
            ) : (
                <ul>
                    {
                        resourceData.map((resource: Resources)=>(
                            <li>
                                {resource.title}
                                {/* <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a resource"/> */}
                            </li>
                        ))
                    } 
                </ul>      
            )            
        }
        </div>
    )
}


// //nav bar
// //search bar
// //6 card components from the db
// //footer

// //create functional home component
// //use the useQuery hook from apollo client library and import the query from utils/query.ts. this should match the backend because the backend is working

export default Home

// //create state variable: const {resources, setResources} = useState[]

// //once data is in the useState variable then it will kickoff the JSX to map through and create a card for each object from the query

// //useEffect for after the render of the initial component to call the callback function to run query
// //have UL created to see each item to display on the screen. At that point we can work on styling the cards

// //generate 6 cool resources with good links in the documents to render to the page