import React,{useState,useEffect} from 'react';
import firebase from '../firebase';
import {Link} from 'react-router-dom'
const Homepage = () => {
    const [product,setproduct]=useState([])
     useEffect(()=>{
        const db= firebase.firestore()
        const data=db.collection('products').get().then(snap=>{
           const data= snap.docs.map(doc=>doc.data())
           setproduct(data)
        })
     },[])

    
    return ( <div style={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',padding:"0px 50px",height:'100vh',flexWrap:'wrap'}}>

        {product.map((item)=>{
            return (<div style={{maxWidth:'300px',maxHeight:'500px',padding:'10px',boxShadow:'2px 3px 15px',marginTop:'10px'}}>
                <div  >
                    <img src= {`https://source.unsplash.com/1600x900/?${item.title}`} style={{width:'100%',objectFit:"cover"}}/>
                    
                </div>
                <h2 style={{textTransform:'capitalize'}}>{item.title}</h2>
                    <Link to={`product/${item.title}`} as="button" style={{width:'120px',
                    color:'white',backgroundColor:'black',padding:'15px',textDecoration:"none",
                    display:'inline-block'
                    }}>VIEW PRODUCT</Link>
            </div>)

        })}

    </div> );
}
 
export default Homepage;