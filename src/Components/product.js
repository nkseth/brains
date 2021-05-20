import React,{useState,useEffect} from 'react';
import './product.module.css'
import { FacebookShareButton, FacebookIcon } from "react-share"
import { withRouter } from "react-router";
import firebase from '../firebase'
import ReactDOM from 'react-dom'
import MetaTags from 'react-meta-tags';
import DocumentMeta from 'react-document-meta';

const Product = (props) => {
    const [product,setproduct]=useState([])
    useEffect(()=>{
        const db= firebase.firestore()
        const data=db.collection('products').where("title", "==",`${props.match.params.id}` ).get().then(snap=>{
           const data= snap.docs.map(doc=>doc.data())
           setproduct(data)
        })
        console.log(props.match.params.id)
        console.log(window.location.href)
        document.title=props.match.params.id
     },[])

     const meta = {
        title:"",
        description: 'I am a description, and I can create multiple tags',
        canonical: 'http://example.com/path/to/page',
        meta: {
          charset: 'utf-8',
          name: {
            keywords: 'react,meta,document,html,tags'
          },
          image: {}
        }
      };




    return (
    <div className="App">
        {product.map((item)=>{
           meta.title=item.title
           meta.meta.image= `https://source.unsplash.com/1600x900/?${item.title}`
           return(
<>
<DocumentMeta {...meta}>
<div class="card">
<h2 style={{textAlign:"center"}}>Product Card</h2>
 <img src= {`https://source.unsplash.com/1600x900/?${item.title}`} alt="Denim Jeans" style={{width:"100%"}}/>
 <h1>{item.title}</h1>
 <p className="price">${item.price}</p>
 <p>Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum. Lorem jeamsun denim lorem jeansum.</p>
 <p><button>Add to Cart</button></p>
 <FacebookShareButton
   url={`${window.location.href}`}
   quote={`${item.title}`}
   media={`https://source.unsplash.com/1600x900/?${item.title}`}
   hashtag="#programing">
   <FacebookIcon logoFillColor="white"  />
</FacebookShareButton>
</div>
</DocumentMeta>
</>
            )
        })}
   



</div>


);
}
 
export default withRouter(Product);