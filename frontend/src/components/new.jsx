import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/new.css'

const New = () =>{
    const navigate = useNavigate()
    const [submitted, setSubmitted] = useState(false)
    const [formdata, setFormData] = useState({
        title : "",
        author : "",
        img : "",
        ingredients : "",
        instruction : ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (submitted) return;
      
        try {
          setSubmitted(true);
      
          const user = JSON.parse(localStorage.getItem("user"))._id;
          const { title, author, img, ingredients, instruction } = formdata;
      
          if (!title || !author || !img || !ingredients || !instruction) {
            alert("Please fill in all the details");
            return;
          }
      
          const response = await axios.post(
            `http://localhost:5412/recipe/${user}`,
            {
              title,
              author,
              img: { url: img },
              ingredients,
              instruction,
            }
          );
      
          alert("Recipe added successfully");
          navigate("/landing");
        } catch (error) {
          console.error(error);
          alert("An error occurred while adding the recipe. Please try again later.");
        }
      };
    return(
        <div className="newcomp">
            <h1>Create a Recipe</h1>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="inp">
                        <label htmlFor="title">Recipe Title</label>
                        <input type="text" value={formdata.title} onChange={(e)=>setFormData({...formdata, title:e.target.value})} />
                    </div>
                    <div className="inp">
                        <label htmlFor="Author">Author</label>
                        <input type="text" value={formdata.author} onChange={(e)=>setFormData({...formdata, author:e.target.value})} />
                    </div>
                    <div className="inp">
                        <label htmlFor="img">Please Upload your image</label>
                        <input type="file" value={formdata.img} onChange={(e)=>setFormData({...formdata, img:e.target.value})} />
                    </div>
                    <div className="inp">
                        <label htmlFor="ingredients">Ingredients</label>
                        <textarea name="ingredients" id="" cols="30" rows="10" value={formdata.ingredients} onChange={(e)=>setFormData({...formdata, ingredients:e.target.value})}></textarea>
                    </div>
                    <div className="inp">
                        <label htmlFor="recipe-dir">Recipe Direction</label>
                        <textarea name="recipe-direction" id="" cols="30" rows="10" value={formdata.instruction} onChange={(e)=>setFormData({...formdata, instruction:e.target.value})}></textarea>
                    </div>
                    <div className="inp but">
                        <button className="sub" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default New