import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/Recipe.module.css';

function RecipePage() {
    const location = useLocation();
    const { recipe } = location.state;
    // Initialize visibility state for sections
    const [visibleSections, setVisibleSections] = useState({});

    if (!recipe) {
        return <div>No recipe data available.</div>;
    }

    // Toggle the visibility of a section
    const toggleSectionVisibility = (index) => {
        setVisibleSections(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <div className={styles.pageContainer}>
            <h1>{recipe.name}</h1>
            <img src={recipe.picture} alt={recipe.name} className={styles.recipePicture} />
            
            {recipe.sections && recipe.sections.map((section, index) => (
                <div key={index} className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>{section.title}</h2>
                        <button onClick={() => toggleSectionVisibility(index)} className={styles.toggleButton}>Toggle</button>
                    </div>
                    {visibleSections[index] !== false && (
                        <table className={styles.ingredientTable}>
                            <tbody>
                                {section.items.map((item, itemIndex) => (
                                    <tr key={itemIndex}>
                                        <td>{item.name}</td>
                                        <td>{item.amount || item.details}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            ))}
            
            <h2>Steps:</h2>
            <ol className={styles.stepsList}>
                {recipe.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className={styles.stepItem}>
                        {step.description}
                        {step.picture && (
                            <img src={step.picture} alt={`Step ${stepIndex + 1}`} className={styles.stepPicture} />
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default RecipePage;
