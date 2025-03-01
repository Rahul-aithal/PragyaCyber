import json
from docxtpl import DocxTemplate
from typing import Any, Dict, List, Union
from .conetxt_builder import ContextGenerate
import os

# Define a custom type alias for JSON-compatible data structures
JSONType = Union[Dict[str, Any], List[Any], str, int, float, bool, None]


# ==================================================================
# 1. Generate Document Function with Enhanced Error Handling
# ==================================================================
def generate_document(templateFile: str, jsonPath: str):
    """
    Generate a document by combining a template with JSON data.
    
    Args:
        templateFile (str): Path to the DOCX template file
        jsonPath (str): Path to the JSON data file
    
    Returns:
        str: Name of the generated document
        
    Raises:
        FileNotFoundError: If template or JSON file not found
        json.JSONDecodeError: If JSON is invalid
        Exception: For other errors during document generation
    """
    
    try:
        # Load the DOCX template file into memory
        doc = DocxTemplate(templateFile)
        
        # Read and parse the JSON data from the specified file
        with open(jsonPath, "r") as json_file:
            data = json.load(json_file)

        # Process the JSON data and build a context dictionary for template rendering
        # ImageGenerate handles image processing and context preparation
        contextGenerator = ContextGenerate(doc)

        context = contextGenerator.context_builder(data)
        # Apply the context data to the template
        doc.render(context)
        
        # Set the output filename
        generate_document = "output/generated_test.docx"
        
        # Save the final document to disk
        doc.save(generate_document)

        print("Document generated successfully!")

        print("Cleaning the downloaded files ")
        contextGenerator.delete_downloaded()

        return os.path.abspath(generate_document)
        
    except FileNotFoundError as e:
        print(f"Error: File not found - {str(e)}")
        raise
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON format - {str(e)}")
        raise
    except Exception as e:
        print(f"Error generating document: {str(e)}")
        raise
