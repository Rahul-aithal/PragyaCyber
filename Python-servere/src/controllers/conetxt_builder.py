from docxtpl import DocxTemplate, InlineImage
from typing import Any, Dict, List, Union
from .graph import draw_graph
# Define a type for our JSON-like data
JSONType = Union[Dict[str, Any], List[Any], str, int, float, bool, None]
from docx.shared import Mm
import requests
import puremagic
import os
import time


class ContextGenerate:
    """
    A class for processing and generating images within document templates.
    """
    image_download_list:List[str]=[]

    def __init__(self, doc):
        """
        Initialize with a document template.
        Args:
            doc: The document template instance
        """
        self.doc = doc

    def process_image(self, path: str, size: int = 50):
        """
        Convert an image file to an InlineImage object for document insertion.
        Args:
            path: Path to the image file
            size: Width of the image in millimeters (default: 50)
        Returns:
            InlineImage object ready for template insertion
        """
        if not path.startswith("public"):
            if not (path.startswith("http://") or path.startswith("https://")):
            # Optionally, prepend a default scheme, e.g., "http://"
                path = "https://" + path
            response = requests.get(path, stream=True)

            if response.status_code == 200:
                unique = time.time_ns()

                ext = puremagic.what(file=None, h=response.content)
                save_path = f"public/images{unique}.{ext}"
                with open(save_path, 'wb') as out_file:

                    for chunk in response.iter_content(1024):
                        out_file.write(chunk)

                print(f"Image downloaded to: {save_path}")

                return self.process_image(save_path,size)

            else:

                print(f"Error downloading image: {response.status_code}")
        # print("path"+ path)
        else:
            self.image_download_list.append(os.path.abspath(path))
            return InlineImage(self.doc, path, width=Mm(size))

    def context_builder(self, data: JSONType) -> JSONType:
        """
        Recursively process data structure to handle special keys and convert images.
        Special handling for:
        - pieChart keys: Generates charts from values
        - image keys: Converts image paths to InlineImage objects
        
        Args:
            data: Input data structure (dict, list, or primitive types)
        Returns:
            Processed data structure with images converted to InlineImage objects
        """
        if isinstance(data, dict):
            context: Dict[str, Any] = {}
            for key, value in data.items():
                if "pieChart" in key:
                    # Handle pie chart generation
                    if isinstance(value, dict) and "values" in value:
                        image_path = draw_graph(value["values"])
                        if image_path:
                            context[key] = { **value, "image": self.process_image(image_path,75) }
                        else:
                            context[key] = value
                    else:
                        context[key] = value
                elif isinstance(value, list):
                    # Recursively process lists
                    context[key] = [self.context_builder(item) for item in value]
                elif isinstance(value, dict):
                    # Recursively process nested dictionaries
                    context[key] = self.context_builder(value)
                elif "image" in key.lower() and isinstance(value, str):
                    # Convert image paths to InlineImage objects
                    context[key] = self.process_image(value)
                else:
                    # Keep other values as is
                    context[key] = value
            return context
        elif isinstance(data, list):
            # Process each item in the list
            return [self.context_builder(item) for item in data]
        else:
            # Return primitive types unchanged
            return data
    def delete_downloaded(self):
        for file in self.image_download_list:
            if os.path.isfile(file):
                print(f"The file {file} got removed 🧹")
                os.remove(file)
            else:
                print("This file not found",file)