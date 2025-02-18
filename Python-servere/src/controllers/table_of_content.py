import os
import win32com.client
import time
from .doc_generator import generate_document


# ==================================================================
# 2. TOC Update Function with Enhanced Error Handling
# ==================================================================
def update_toc(doc_path):
    try:
        word = win32com.client.Dispatch("Word.Application")
        word.Visible = False  # Set to True for debugging
        
        # Convert to absolute path and verify existence
        abs_path = os.path.abspath(doc_path)
        if not os.path.exists(abs_path):
            raise FileNotFoundError(f"Document not found: {abs_path}")

        doc = word.Documents.Open(abs_path)
        
        # Verify TOC exists before updating
        if doc.TablesOfContents.Count == 0:
            print("⚠️ Warning: No TOC field found in document. Creating one...")
            add_toc_field(doc)  # Add our helper function to insert TOC
        
        # Update all TOCs
        print("Updating TOC...")
        for toc in doc.TablesOfContents:
            toc.Update()
        
        # Ensure changes are saved
        doc.Save()
        print("✅ TOC update completed successfully")

    except Exception as e:
        print(f"❌ Error updating TOC: {str(e)}")
    finally:
        # Proper cleanup even if errors occur
        if 'doc' in locals():
            doc.Close()
        if 'word' in locals():
            word.Quit()
        time.sleep(1)  # Allow time for Word process to release

# ==================================================================
# 3. Helper Function to Add TOC Field (if missing)
# ==================================================================
def add_toc_field(doc):
    # Create TOC field code (Heading 1-3)
    doc.Content.InsertAfter("\n")  # Add new paragraph for TOC
    doc.TablesOfContents.Add(
        Range=doc.Content,
        UseHeadingStyles=True,
        UpperHeadingLevel=1,
        LowerHeadingLevel=3
    )

# ==================================================================
# Main Execution
# ==================================================================
if __name__ == "__main__":
    # Step 1: Generate document
    doc_path = generate_document("public/pragya_CybperPenTest_template.docx","input/data.json")
    
    # Step 2: Update TOC
    update_toc(doc_path)
    
    # Optional: Open the final document
    os.startfile(doc_path)