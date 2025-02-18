from controllers.doc_generator import generate_document
from controllers.table_of_content import update_toc
import os

def main():
        # Step 1: Generate document
    doc_path = generate_document("public/pragya_CybperPenTest_template.docx","input/data.json")
    
    # Step 2: Update TOC
    update_toc(doc_path)

    # Optional: Open the final document
    os.startfile(doc_path)

main()


# from fastapi import FastAPI

# app = FastAPI()

