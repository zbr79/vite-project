import React from "react";
import '../../styles/RecipeComponents/Chart.css'; 
const RecipeChart = ({recipe}) => {
    return(

    <div classname ="recipchart">
        {recipe.sections && recipe.sections.map((section, index) => (
            <div key={index} className="section">
              <h2>{section.title}</h2>
              <table className="ingredients-table">
                <tbody>
                  {section.items.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td>{item.name}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
          }
    </div>

    );
};

export default RecipeChart;