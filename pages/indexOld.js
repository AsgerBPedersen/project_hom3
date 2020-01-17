import React from 'react'
import { useQuery } from '@apollo/react-hooks'; 
import { gql } from 'apollo-boost';

const testQuery = gql`
{
  homes(first:100) {
    id
    address
    lat
    lon
    title
  }
}
`;

const Home = () => {
  const { loading, error, data } = useQuery(testQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>'Error :('</p>;

  return data.homes.map(({ 
    id,
    address,
    lat,
    lon,
    title,
   }) => (
    <div key={id}>
<h3>{title}</h3>
      <p>
        {address}
      </p>
    </div>
  ));

}
  
    


export default Home
