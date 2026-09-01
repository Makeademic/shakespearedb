import csv
import os
import re

# --- Configuration ---
csv_file_path = "data.csv"       # Path to your source CSV file
output_directory = "copies" # Folder where .md files will be saved
filename_column = "filename"         # CSV column header to use for the file names
messy_text = ["prov_info", "summary", "binding", "binder", "marginalia", "condition", "issue_notes", "title", "shelfmark"]         # Python list to be called outside of for loop

# Create output directory if it doesn't exist
os.makedirs(output_directory, exist_ok=True)

def sanitize_filename(name):
    """Removes characters that are invalid for filenames."""
    return re.sub(r'[\\/*?:"<>|]', "", name).strip()

# Read CSV and generate files
with open(csv_file_path, mode='r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    
    for row in reader:
        # Determine the filename
        raw_filename = row.get(filename_column, "untitled")
        clean_filename = sanitize_filename(raw_filename)
        file_path = os.path.join(output_directory, f"{clean_filename}.md")
        
        # Build the Markdown string with YAML frontmatter
        markdown_content = "---\n"

        for key, value in row.items():
            # Basic YAML escaping for quotes and newlines
              if value:
                  for i in messy_text:
                      if key == i:
                          value = f'|\n  {value}'
              markdown_content += f"{key}: {value}\n"
        markdown_content += "---\n\n"
        
        # Optional: Add body content if your CSV has a content/body column
        if "content" in row:
            markdown_content += f"{row['content']}\n"
            
        # Write to the individual markdown file
        with open(file_path, mode='w', encoding='utf-8') as out_file:
            out_file.write(markdown_content)

print(f"Successfully converted CSV rows into individual files in '{output_directory}'!")