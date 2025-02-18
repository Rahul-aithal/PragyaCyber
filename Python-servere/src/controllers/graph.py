import matplotlib.pyplot as plt
from typing import Any, Dict, List, Union

# Define a custom type for JSON-like data structures
JSONType = Union[Dict[str, Any], List[Any], str, int, float, bool, None]



def draw_graph(data: JSONType):
    """
    Creates and saves a pie chart from the provided JSON data.
    
    Args:
        data (JSONType): List of dictionaries containing 'name' and 'value' pairs
        
    Returns:
        str: Path to the saved image file, or None if there's an error
    """
    # Check if data is empty
    if not data:
        print("No data provided to draw_graph!")
        return None

    try:
        # Extract names and values from the data for the pie chart
        labels = [x["name"] for x in data]
        sizes = [x["value"] for x in data]

        # Create a new figure and axis for the pie chart
        fig, ax = plt.subplots()
        
        # Draw the pie chart with percentages and labels
        ax.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90)
        
        # Make the pie chart circular
        ax.axis('equal')

        # Adjust the layout to prevent label overlap
        fig.tight_layout()

        # Save the pie chart as a JPEG file
        file_path = "public/images/sample_piechart.jpeg"
        fig.savefig(file_path)
        
        # Clean up matplotlib resources
        plt.close(fig)  

        print("Pie chart saved as:", file_path)
        return file_path

    except Exception as e:
        # Handle any errors during chart creation
        print("Error while drawing pie chart:", e)
        return None
